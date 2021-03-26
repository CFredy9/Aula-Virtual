import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

import datetime

from django.template.loader import render_to_string
import jwt
#import api.correo


from api.models import Profile
from api.serializers import UserRegistroSerializer, UserReadSerializer, ProfileRegistroSerializer

from api.permission import IsStaff


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "first_name")
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return UserReadSerializer
        else:
            return UserRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        usuario = User.objects.get(username=request.data["username"])
        usuario.set_password(request.data["password"])
        usuario.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    @action(methods=["put"], detail=False)
    def update_me(self, request, *args, **kwargs):
        data = request.data
        try:
            avatar = data.get("avatar")
            data = json.loads(data["data"])
            user = request.user
            if user.username != data["username"]:
                try:
                    User.objects.get(username=data["username"])
                    return Response(
                        {"detail": "the chosen username in not available, please pick another"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                except User.DoesNotExist:
                    pass
            user.username = data["username"]
            user.first_name = data["first_name"]
            user.last_name = data["last_name"]
            user.email = data["email"]
            perfil, created = Profile.objects.get_or_create(user=user)
            if avatar is not None:
                perfil.avatar = File(avatar)
            profile = data.get("profile")
            if profile is not None:
                perfil.phone = profile.get("phone", perfil.phone)
                perfil.address = profile.get("address", perfil.address)
                perfil.gender = profile.get("gender", perfil.gender)
            user.save()
            perfil.save()
            serializer = UserReadSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer = UserReadSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def token(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.get(username=data["username"])
            if user.check_password(data["password"]):
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserReadSerializer(user)
                return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_200_OK)
            return Response({"detail": "Password does not match user password"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({"detail": "session not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=["put"], detail=False)
    def update_contraseña(self, request, *args, **kwargs):
        data = request.data
        try:
            user = request.user
            data = request.data

            user = User.objects.get(username=user)
            profile = Profile.objects.get(user__username=user)

            user.set_password(data.get('password'))
            
            if data.get('id') is None:
                profile.inicio_sesion = True

            user.save()
            profile.save()

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def enviarCorreo(self, request, *args, **kwargs):
        try:
            data = request.data
            user = User.objects.get(email=data.get("email"))
            serializer = UserReadSerializer(user)
            usuario = serializer.data.get('first_name') + ' ' + serializer.data.get('last_name')
            username = serializer.data.get('username')
            email = data.get('email')
            fecha = datetime.datetime.now()
            hoy = fecha.strftime('%Y-%m-%d %H:%M')
            encoded_jwt = jwt.encode({'usuario': usuario, 'username':username, 'email':email, 'fecha':hoy}, "secret", algorithm="HS256")
            print(encoded_jwt)
            ha = jwt.decode(encoded_jwt, "secret", algorithms=["HS256"])
            #{'some': 'payload'}
            print(ha)
            
            
            
            mailServer = smtplib.SMTP('smtp.gmail.com',587)
            mailServer.ehlo()
            mailServer.starttls()
            mailServer.ehlo()
            mailServer.login("danicalderon628@gmail.com","calderonguillen7")

            # Construimos el mensaje simple
            mensaje = MIMEMultipart()
            mensaje['From']="danicalderon628@gmail.com"
            mensaje['To']=email
            mensaje['Subject']="Solicitud de Cambio de Contraseña"

            content = render_to_string('./correo.html', {'codigo':encoded_jwt, 'usuario': usuario})
            #print("mensaje", mensaje)
            mensaje.attach(MIMEText(content, 'html'))
            
            # Envio del mensaje
            mailServer.sendmail("danicalderon628@gmail.com",
                                email,
                                mensaje.as_string())
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def leer_token(self, request, *args, **kwargs):
        data = request.query_params
        codigo=""
        for x in data:
            codigo = codigo + data.get(x)
        token = jwt.decode(codigo, "secret", algorithms=["HS256"])
        return Response(token, status=status.HTTP_200_OK)

    @action(methods=["put"], detail=False)
    def recuperacion_contraseña(self, request, *args, **kwargs):
        data = request.data
        try:
            data = request.data
            user = data.get('username')
            print('DATA', data)
            user = User.objects.get(username=user)
            user.set_password(data.get('password'))

            user.save()

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

