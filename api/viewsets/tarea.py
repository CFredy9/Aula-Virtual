from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from rest_framework import pagination

from django.db.models import Sum, Count

import datetime
from django.utils import timezone
#from datetime import timedelta

import json
from django.core.files import File

from api.permission import IsStaff, IsCatedratico

from api.models import Tarea, Detalle_Curso, Calificacion_Tarea
from api.serializers import TareaSerializer, TareaRegistroSerializer


class TareaViewset(viewsets.ModelViewSet):
    queryset = Tarea.objects.filter(activo=True)
    #permission_classes = (IsStaff,)

    """filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_curso",)
    search_fields = ("nombre_curso",)
    ordering_fields = ("nombre_curso",) """

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return TareaSerializer
        else:
            return TareaRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @permission_classes([IsAuthenticated])
    def list(self, request, *args, **kwargs):
        user = request.user
        data = request.query_params
        id=data.get('id')

        #queryset = Tarea.objects.filter(detalle_curso=id, fecha=fechaActual, activo=True).order_by('id')
        queryset = Tarea.objects.filter(detalle_curso=id, activo=True).exclude(tarea__estudiante__profile__user=user).order_by('fecha')
        #queryset = Tarea.objects.filter().order_by('id')
        serializer = TareaSerializer(queryset, many=True)

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

    def create(self, request):
        try:
            with transaction.atomic():
                
                data = request.data 

                archivo = data.get("archivo")
                data = json.loads(data["data"])  

                punteo_tareas = data.get('punteo_tareas')
                valor_tarea = data.get('valor_tarea') 

                if punteo_tareas is None:
                    punteo_tareas = 0

                if(punteo_tareas + int(valor_tarea) <= 100):
                    verify = TareaRegistroSerializer(data=data)
                    if verify.is_valid():
                        
                        detalle_curso = Detalle_Curso.objects.get(pk=data.get('detalle_curso'))

                        tarea = Tarea.objects.create(
                            detalle_curso=detalle_curso,
                            titulo=data.get('titulo'),
                            descripcion=data.get('descripcion'),
                            valor_tarea=data.get('valor_tarea'),
                            archivo = File(archivo),
                            fecha=data.get('fecha')
                        ) 
                    else:
                        #print("Error en la verificación")
                        return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"detail":"La tarea sobrepasa la nota de 100 puntos"}, status=status.HTTP_400_BAD_REQUEST)
                
            return Response(verify.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)   

    def update(self, request, pk):
        try:
            with transaction.atomic():
                
                data = request.data 

                archivo = data.get("archivo")
                data = json.loads(data["data"])

                #now = datetime.now()
                #fechaActual = now.strftime("2021-03-20")
                #print('now', fechaActual)

                verify = TareaRegistroSerializer(data=data)
                if verify.is_valid():

                    tarea = Tarea.objects.get(pk=pk)
                    id_detalle_curso = data.get('detalle_curso')
                    detalle_curso = Detalle_Curso.objects.get(pk=id_detalle_curso)

                    if tarea.archivo is None:
                        if archivo is not None:
                            tarea.archivo = File(archivo)
                    elif tarea.archivo is not None:
                        if archivo is not None:
                            tarea.archivo.delete()
                            tarea.archivo = File(archivo)

                    tarea.detalle_curso = detalle_curso
                    tarea.titulo = data.get('titulo')
                    tarea.descripcion = data.get('descripcion')
                    tarea.valor_tarea = data.get('valor_tarea')
                    tarea.fecha = data.get('fecha')
                    #tarea.archivo = File(archivo)  
                    tarea.save()
                else:
                    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(verify.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST) 

    @action(methods=["get"], detail=False)
    def listado(self, request, *args, **kwargs):
        try:
            data = request.query_params
            id=data.get('id')
            now = datetime.now()
            fechaActual = now.strftime("2021-03-20")
            print('now', fechaActual)
            query = Tarea.objects.filter(detalle_curso=id, activo=True)
            serializer = TareaSerializer(query, many=True)
            #serializer = UserReadSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def tarea_nota(self, request, *args, **kwargs):
        user = request.user
        data = request.query_params
        id = data.get('0')
        queryset = Tarea.objects.filter(detalle_curso=id, activo=True).aggregate(Sum('valor_tarea'))
        d = 'detalle_curso'
        queryset[d] = id 
        return Response(queryset, status=status.HTTP_200_OK)
