from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction

import json
from django.core.files import File

from api.permission import IsStaff

from api.models import Detalle_Curso, Asignacion_Curso
from api.serializers import DetalleCursoSerializer, DetalleCursoRegistroSerializer, AsignacionCursoSerializer


class DetalleCursoViewset(viewsets.ModelViewSet):
    queryset = Detalle_Curso.objects.filter(activo=True)
    #permission_classes = (IsStaff,)

    """filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_curso",)
    search_fields = ("nombre_curso",)
    ordering_fields = ("nombre_curso",) """

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return DetalleCursoSerializer
        else:
            return DetalleCursoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def list(self, request, *args, **kwargs):
        data = request.query_params
        id=data.get('id')
        queryset = Detalle_Curso.objects.filter(curso_asignado=id)
        serializer = DetalleCursoSerializer(queryset)

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

    def update(self, request, pk):
        try:
            with transaction.atomic():
                user = request.data
                data = request.data

                portada = data.get("portada")
                data = json.loads(data["data"])

                print('portada', portada)

                verify = DetalleCursoRegistroSerializer(data=data)
                #if verify.is_valid():

                detalle_curso = Detalle_Curso.objects.get(pk=pk)

                if detalle_curso.portada is None:
                    if portada is not None:
                        detalle_curso.portada = File(portada)
                elif detalle_curso.portada is not None:
                    if portada is not None:
                        detalle_curso.portada.delete()
                        detalle_curso.portada = File(portada)
                       
                
                
                #if portada is not None:
                #    detalle_curso.portada = File(portada) 
                #    if detalle_curso.portada is not None:
                #        detalle_curso.portada.delete()

                detalle_curso.descripcion = data.get('descripcion')
                #detalle_curso.portada = File(portada)  
                detalle_curso.save()
                #else:
                #    return Response({"detail_serializer":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response( status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST) 

    @action(methods=["get"], detail=False)
    def detalle(self, request, *args, **kwargs):
        try:
            #user = request.user
            data = request.query_params
            id=data.get('id')
            print("ID: ",id)
            queryset = Detalle_Curso.objects.filter(id=id)
            print('query', queryset)
            serializer = DetalleCursoSerializer(queryset, many=True)
            

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)