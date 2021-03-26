from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from django.db.models import Sum, Count

from api.permission import IsStaff

from api.models import Estudiante, Profile, Rol, Grado
from api.serializers import EstudianteSerializer, EstudianteRegistroSerializer, UserReadSerializer


class EstudianteViewset(viewsets.ModelViewSet):
    queryset = Estudiante.objects.filter(activo=True)
    #permission_classes = (AllowAny,)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("profile__user__first_name", "profile__user__last_name",)
    search_fields = ("profile__user__first_name", "profile__user__last_name",)
    ordering_fields = ("profile__user__first_name", "profile__user__last_name",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EstudianteSerializer
        else:
            return EstudianteRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def list(self, request, *args, **kwargs):
        data = request.query_params
        id=data.get('id')
        if id is not None:
            queryset = Estudiante.objects.filter(grado=id, activo=True)
        else:
            queryset = Estudiante.objects.filter(activo=True)

        serializer = EstudianteSerializer(queryset)

        page = request.GET.get('page')

        try: 
            page = self.paginate_queryset(queryset)
            print('page', page)
        except Exception as e:
            page = []
            data = page
            return Response({
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'No more record.',
                "data" : data
                })

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            data = serializer.data
            return self.get_paginated_response(data)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @permission_classes([IsStaff])
    def create(self, request):
        try:
            with transaction.atomic():
                user = request.data
                data = request.data
                
                #rol = 2
                #serializer = CatedraticoRegistroSerializer(data=request.data)
                verify = EstudianteRegistroSerializer(data=data)
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
                    grado = Grado.objects.get(pk=data.get('grado'))
                    
                    estudiante = Estudiante.objects.create(
                        profile=profile,
                        grado=grado,
                        nombre_contacto=data.get('estudiante').get('nombre_contacto'),
                        telefono_contacto=data.get('estudiante').get('telefono_contacto')
                    )

                    
                else:
                    #print("Error en la verificación")
                    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(verify.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @permission_classes([IsStaff])
    def update(self, request, pk):
        try:
            with transaction.atomic():
                user = request.data
                data = request.data
                verify = EstudianteRegistroSerializer(data=data)
                #if verify.is_valid():
                    
                estudiante = Estudiante.objects.get(pk=pk)

                profile = estudiante.profile
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

                id_grado = data.get('grado')
                grado = Grado.objects.get(pk=id_grado)
                    
                estudiante.grado = grado
                estudiante.nombre_contacto = data.get('estudiante').get('nombre_contacto')
                estudiante.telefono_contacto = data.get('estudiante').get('telefono_contacto')
                estudiante.save()
                #else:
                #    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def total_estudiantes(self, request, *args, **kwargs):
        user = request.user
        queryset = Estudiante.objects.filter(
            activo=True
            ).aggregate(
                total=Count(
                    'id'
                    ), 
                )
        return Response(queryset, status=status.HTTP_200_OK)
    