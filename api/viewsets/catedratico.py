from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from django.db.models import Sum, Count, Q

from api.permission import IsStaff

from api.models import Catedratico, Profesion, Profile, Rol
from api.serializers import CatedraticoSerializer, CatedraticoRegistroSerializer, UserReadSerializer


class CatedraticoViewset(viewsets.ModelViewSet):
    queryset = Catedratico.objects.filter(activo=True)
    #permission_classes = (IsStaff,)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("profile__user__first_name", "profile__user__last_name",)
    search_fields = ("profile__user__first_name", "profile__user__last_name",)
    ordering_fields = ("profile__user__first_name", "profile__user__last_name",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CatedraticoSerializer
        else:
            return CatedraticoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated, IsStaff]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            with transaction.atomic():
                user = request.data
                data = request.data
                
                #rol = 1
                #serializer = CatedraticoRegistroSerializer(data=request.data)
                verify = CatedraticoRegistroSerializer(data=data)
                if verify.is_valid():

                    user = User.objects.create(
                        username=data.get('profile').get('user').get('username'),
                        email=data.get('profile').get('user').get('email'),
                        first_name=data.get('profile').get('user').get('first_name'),
                        last_name=data.get('profile').get('user').get('last_name'),
                    )
                    user.set_password(data.get('profile').get('user').get("password"))
                    user.save()
                    rol = Rol.objects.get(pk=data.get('profile').get('rol'))
                    profile = Profile.objects.create(
                        user=user,
                        avatar=data.get('profile').get('avatar'),
                        gender=data.get('profile').get('gender'),
                        phone=data.get('profile').get('phone'),
                        address=data.get('profile').get('address'),
                        rol=rol
                    )
                    profesion = Profesion.objects.get(pk=data.get('profesion'))
                    #print(request.data.get('profesion'))

                    catedratico = Catedratico.objects.create(
                        profile=profile,
                        profesion=profesion,
                        
                    )

                    
                else:
                    #print("Error en la verificación")
                    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(verify.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        try:
            with transaction.atomic():
                user = request.data
                data = request.data
                verify = CatedraticoRegistroSerializer(data=data)
                #if verify.is_valid():

                catedratico = Catedratico.objects.get(pk=pk)
                id_profesion = data.get('profesion')
                profesion = Profesion.objects.get(pk=id_profesion)

                profile = catedratico.profile
                profile.gender = data.get('profile').get('gender')
                profile.phone = data.get('profile').get('phone')
                profile.address = data.get('profile').get('address')
                profile.save()

                user = profile.user
                user.username = data.get('profile').get('user').get('username')
                user.email = data.get('profile').get('user').get('email')
                user.first_name = data.get('profile').get('user').get('first_name')
                user.last_name = data.get('profile').get('user').get('last_name')
                user.save()

                catedratico.profesion = profesion
                catedratico.save()
                #else:
                #    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def total_usuarios(self, request, *args, **kwargs):
        user = request.user
        queryset = User.objects.filter(
            profile__activo=True
            ).aggregate(
                total=Count(
                    'id'
                    ), 
                )
        return Response(queryset, status=status.HTTP_200_OK)

    @action(methods=["get"], detail=False)
    def total_catedraticos(self, request, *args, **kwargs):
        user = request.user
        queryset = Catedratico.objects.filter(
            activo=True
            ).aggregate(
                total=Count(
                    'id'
                    ), 
                )
        return Response(queryset, status=status.HTTP_200_OK)
    