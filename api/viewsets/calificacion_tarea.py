from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets, mixins
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from rest_framework import pagination
from django.db.models import Sum, Count, Q

import datetime

import json
from django.core.files import File

from api.permission import IsCatedratico

from api.models import Calificacion_Tarea, Estudiante, Tarea, Asignacion_Curso
from api.serializers import CalificacionTareaSerializer, CalificacionTareaRegistroSerializer, AsignacionCursoSerializer

class CalificacionTareaViewset(viewsets.ModelViewSet):
    #queryset = Asignacion_Estudiante.objects.filter(curso_asignado__catedratico__profile__user=2)
    
    queryset = Calificacion_Tarea.objects.filter(activo=True)
    #permission_classes = (IsCatedratico,)

    """filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_grado",)
    search_fields = ("nombre_grado",)
    ordering_fields = ("nombre_grado",) """

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CalificacionTareaSerializer
        else:
            return CalificacionTareaRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @permission_classes([IsAuthenticated])
    def list(self, request, *args, **kwargs):
        user = request.user
        data = request.query_params
        id = data.get('id')
        if id is None:
            idp = data.get('idp')
            #Filtración para calificacion de tareas del estudiante (No calificadas)
            queryset = Calificacion_Tarea.objects.filter(estudiante__profile__user=user, tarea__detalle_curso__id=idp, nota=0, activo=True)
        else:
            #Filtración para calificacion de tareas por parte del catedratico
            queryset = Calificacion_Tarea.objects.filter(tarea__id=id, activo=True)
        #queryset = Calificacion_Tarea.objects.filter(activo=False)
        serializer = CalificacionTareaSerializer(queryset, many=True)

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
        
    @permission_classes([IsAuthenticated])
    def create(self, request):
        try:
            with transaction.atomic():
                user = request.user
                data = request.data

                very = data.get('estudiante')
                estudiante = 0
                documento = data.get("documento")

                if very is None:
                    data = json.loads(data["data"])
                
                fecha_entrega = data.get('fecha')
                fecha_hoy = datetime.datetime.now()
                hoy = fecha_hoy.strftime('%Y-%m-%d %H:%M')

                #print('FECHA ENTREGA', fecha_entrega)
                #print('HOY', hoy)

                if(hoy <= fecha_entrega):

                    verify = CalificacionTareaRegistroSerializer(data=data)
                    #if verify.is_valid():

                    id_estudiante = data.get('estudiante')
                    if id_estudiante is None:
                        id_estudiante = user
                        estudiante = Estudiante.objects.get(profile__user=id_estudiante)
                    else:
                        estudiante = Estudiante.objects.get(pk=id_estudiante)

                    tarea = Tarea.objects.get(pk=data.get('tarea'))

                    calificacion_tarea = Calificacion_Tarea.objects.create(
                        estudiante=estudiante,
                        tarea=tarea,
                        descripcion=data.get('descripcion'),
                        documento = File(documento),
                        nota = data.get('nota')
                    )
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
                
                
                    
                
                #else:
                    #print("Error en la verificación")
                #    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    def update(self, request, pk):
        try:
            with transaction.atomic():

                data = request.data
                very = data.get('estudiante')
                documento = data.get("documento")
                if very is None:
                    data = json.loads(data["data"])

                verify = CalificacionTareaRegistroSerializer(data=data)
                if verify.is_valid():
                    
                    calificacion_tarea = Calificacion_Tarea.objects.get(pk=pk)

                    if calificacion_tarea.documento is None:
                        if documento is not None:
                            calificacion_tarea.documento = File(documento)
                    elif calificacion_tarea.documento is not None:
                        if documento is not None:
                            calificacion_tarea.documento.delete()
                            calificacion_tarea.documento = File(documento)

                    if very is None:
                        calificacion_tarea.descripcion = data.get('descripcion')
                    calificacion_tarea.nota = data.get('nota')
                    calificacion_tarea.save()
                else:
                    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(verify.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def nota_total(self, request, *args, **kwargs):
        user = request.user
        data = request.query_params
        idp = data.get('0')
        queryset = Calificacion_Tarea.objects.filter(estudiante__profile__user=user, tarea__detalle_curso__id=idp, nota__gt=0, activo=True).aggregate(Sum('nota'), Sum('tarea__valor_tarea'))
        return Response(queryset, status=status.HTTP_200_OK)

class Calificadas(viewsets.ModelViewSet):

    serializer_class = CalificacionTareaSerializer
    queryset = Calificacion_Tarea.objects.filter(activo=True)
    serializer = serializer_class(queryset)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def list (self, request, *args, **kwargs):
        user = request.user
        data = request.query_params
        idp = data.get('idp')
        #Filtración de calificacion de tareas del estudiante (Calificadas)
        queryset = Calificacion_Tarea.objects.filter(estudiante__profile__user=user, tarea__detalle_curso__id=idp, nota__gt=0, activo=True)
        serializer = CalificacionTareaSerializer(queryset, many=True)

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

class Pendientes(viewsets.ModelViewSet):

    serializer_class = CalificacionTareaSerializer
    queryset = Calificacion_Tarea.objects.filter(activo=True)
    serializer = serializer_class(queryset)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def list (self, request, *args, **kwargs):
        user = request.user
        print('user', user)
        data = request.query_params
            #Filtración de calificacion de tareas pendientes del catedratico
        queryset = Calificacion_Tarea.objects.filter(
            tarea__detalle_curso__curso_asignado__catedratico__profile__user=user, 
            nota=0, 
            activo=True
            ).order_by('estudiante')
        
        serializer = CalificacionTareaSerializer(queryset, many=True)

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

    @action(methods=["get"], detail=False)
    def total_tareas(self, request, *args, **kwargs):
        user = request.user
        data = request.query_params
        queryset = Calificacion_Tarea.objects.filter(
            tarea__detalle_curso__curso_asignado__catedratico__profile__user=user,
            nota=0, 
            activo=True
            ).aggregate(id=
                Count('id')) 
        return Response(queryset, status=status.HTTP_200_OK)

class Pendientes_Curso(viewsets.ModelViewSet):

    serializer_class = AsignacionCursoSerializer
    queryset = Asignacion_Curso.objects.filter(activo=True)
    serializer = serializer_class(queryset)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def list (self, request, *args, **kwargs):
        user = request.user
        data = request.query_params
        
        queryset = Asignacion_Curso.objects.filter(
            catedratico__profile__user=user,
            activo=True
            ).annotate(
                tareas=Count(
                    'curso_asignado_detalle__detalle_curso_tarea__tarea__id',
                    filter=Q(
                        curso_asignado_detalle__detalle_curso_tarea__tarea__nota=0
                    )
                )
            )
        serializer = CalificacionTareaSerializer(queryset, many=True)

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

class CalificadasTareas(viewsets.ModelViewSet):

    serializer_class = CalificacionTareaSerializer
    queryset = Calificacion_Tarea.objects.filter(activo=True)
    serializer = serializer_class(queryset)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def list (self, request, *args, **kwargs):
        user = request.user
        print('user', user)
        data = request.query_params
            #Filtración de calificacion de tareas pendientes del catedratico
        queryset = Calificacion_Tarea.objects.filter(
            tarea__detalle_curso__curso_asignado__catedratico__profile__user=user, 
            nota__gt=0, 
            activo=True
            ).order_by('estudiante')
        
        serializer = CalificacionTareaSerializer(queryset, many=True)

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

    @action(methods=["get"], detail=False)
    def total_tareas(self, request, *args, **kwargs):
        user = request.user
        data = request.query_params
        queryset = Calificacion_Tarea.objects.filter(
            tarea__detalle_curso__curso_asignado__catedratico__profile__user=user,
            nota__gt=0, 
            activo=True
            ).aggregate(id=
                Count('id')) 
        return Response(queryset, status=status.HTTP_200_OK)

class CalificadasTareas_Curso(viewsets.ModelViewSet):

    serializer_class = AsignacionCursoSerializer
    queryset = Asignacion_Curso.objects.filter(activo=True)
    serializer = serializer_class(queryset)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def list (self, request, *args, **kwargs):
        user = request.user
        data = request.query_params
        
        queryset = Asignacion_Curso.objects.filter(
            catedratico__profile__user=user,
            activo=True
            ).annotate(
                tareas=Count(
                    'curso_asignado_detalle__detalle_curso_tarea__tarea__id',
                    filter=Q(
                        curso_asignado_detalle__detalle_curso_tarea__tarea__nota__gt=0
                    )
                )
            )
        serializer = CalificacionTareaSerializer(queryset, many=True)

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



