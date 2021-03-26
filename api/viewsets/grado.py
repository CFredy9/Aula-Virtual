from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction

from django.db.models import Sum, Count

from api.permission import IsStaff

from api.models import Grado, Nivel
from api.serializers import GradoSerializer, GradoRegistroSerializer


class GradoViewset(viewsets.ModelViewSet):
    queryset = Grado.objects.filter(activo=True)
    #permission_classes = (IsStaff,)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_grado",)
    search_fields = ("nombre_grado",)
    ordering_fields = ("nombre_grado",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return GradoSerializer
        else:
            return GradoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated, IsStaff]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            with transaction.atomic():
                user = request.data
                data = request.data

                #serializer = CatedraticoRegistroSerializer(data=request.data)
                verify = GradoRegistroSerializer(data=data)
                if verify.is_valid():

                    nivel = Nivel.objects.get(pk=data.get('nivel'))
                    #print(request.data.get('profesion'))

                    grado = Grado.objects.create(
                        nivel=nivel,
                        nombre_grado=data.get('nombre_grado')
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
                verify = GradoRegistroSerializer(data=data)
                if verify.is_valid():

                    grado = Grado.objects.get(pk=pk)
                    id_nivel = data.get('nivel')
                    nivel = Nivel.objects.get(pk=id_nivel)

                    grado.nivel = nivel
                    grado.nombre_grado = data.get('nombre_grado')
                    grado.save()
                else:
                    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(verify.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def total_grados(self, request, *args, **kwargs):
        user = request.user
        queryset = Grado.objects.filter(
            activo=True
            ).aggregate(
                total=Count(
                    'id'
                    ), 
                )
        return Response(queryset, status=status.HTTP_200_OK)