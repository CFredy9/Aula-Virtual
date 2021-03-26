from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets, mixins
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from rest_framework import pagination

from django.db.models.functions import Upper
from django.db.models import Sum, Count, Q

from api.permission import IsCatedratico

from api.models import Asignacion_Estudiante, Asignacion_Curso, Estudiante, Rol
from api.serializers import AsignacionEstudianteSerializer, AsignacionEstudianteRegistroSerializer, AsignacionCursoSerializer


class AsignacionEstudianteViewset(viewsets.ModelViewSet):
    #queryset = Asignacion_Estudiante.objects.filter(curso_asignado__catedratico__profile__user=2)
    
    queryset = Asignacion_Estudiante.objects.filter(activo=True)
    #permission_classes = (IsCatedratico,)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("estudiante__profile__user__first_name", )
    search_fields = ("estudiante__profile__user__first_name", )
    ordering_fields = ("estudiante__profile__user__first_name", )

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionEstudianteSerializer
        else:
            return AsignacionEstudianteRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @permission_classes([IsAuthenticated])
    def list(self, request, *args, **kwargs):
        data = request.query_params
        id=data.get('id')
        print('ID ', id)
        queryset = Asignacion_Estudiante.objects.filter(curso_asignado=id, activo=True).order_by('id')
        #queryset = Asignacion_Estudiante.objects.filter(activo=True)
        serializer = AsignacionEstudianteSerializer(queryset, many=True)

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
        
    @permission_classes([IsCatedratico])
    def create(self, request):
        try:
            with transaction.atomic():
                user = request.data
                data = request.data
                print("Datos", data)

                #serializer = CatedraticoRegistroSerializer(data=request.data)
                verify = AsignacionEstudianteRegistroSerializer(data=data)
                if verify.is_valid():

                    curso_asignado = Asignacion_Curso.objects.get(pk=data.get('curso_asignado'))
                    estudiante = Estudiante.objects.get(pk=data.get('estudiante'))

                    asignacion_estudiante = Asignacion_Estudiante.objects.create(
                        curso_asignado=curso_asignado,
                        estudiante=estudiante,
                    )
                else:
                    #print("Error en la verificación")
                    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(verify.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsCatedratico])
    def update(self, request, pk):
        try:
            with transaction.atomic():
                user = request.data
                data = request.data
                verify = AsignacionEstudianteRegistroSerializer(data=data)
                if verify.is_valid():

                    asignacion_estudiante = Asignacion_Estudiante.objects.get(pk=pk)
                    id_curso_asignado = data.get('curso_asignado')
                    curso_asignado = Asignacion_Curso.objects.get(pk=id_curso_asignado)
                    id_estudiante = data.get('estudiante')
                    estudiante = Estudiante.objects.get(pk=id_estudiante)

                    asignacion_estudiante.curso_asignado = curso_asignado
                    asignacion_estudiante.estudiante = estudiante
                    asignacion_estudiante.save()
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
            queryset = Asignacion_Estudiante.objects.filter(curso_asignado=id, activo=True)
            serializer = AsignacionEstudianteSerializer(queryset, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

class MisCursosEst(viewsets.ModelViewSet):

    serializer_class = AsignacionEstudianteSerializer
    queryset = Asignacion_Estudiante.objects.filter(activo=True)
    serializer = serializer_class(queryset)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def list(self, request, *args, **kwargs):
        #queryset =self.filter_queryset(Asignacion_Estudiante.objects.all().order_by('id'))
        user = request.user
        if request.user.profile.rol_id == 2:
            queryset = Asignacion_Estudiante.objects.filter(
                estudiante__profile__user=user, 
                activo=True
                ).annotate(
                    detalle=Upper(
                        'curso_asignado__curso_asignado_detalle__id'
                        ),
                    punteo=Sum(
                        'curso_asignado__curso_asignado_detalle__detalle_curso_tarea__tarea__nota',
                        filter=Q(
                            curso_asignado__curso_asignado_detalle__detalle_curso_tarea__tarea__estudiante__profile__user=user, 
                        ),
                    ),
                ).order_by('id')
        elif request.user.profile.rol_id == 1:

            queryset = Asignacion_Estudiante.objects.filter(
                curso_asignado__catedratico__profile__user=user, 
                activo=True
                ).annotate(
                    punteo=Sum(
                        'curso_asignado__curso_asignado_detalle__detalle_curso_tarea__tarea__nota',
                        filter=Q(
                            curso_asignado__curso_asignado_detalle__detalle_curso_tarea__tarea__estudiante__id=Upper('estudiante__id'), 
                        )
                )
            ).order_by('curso_asignado__curso__nombre_curso').order_by('curso_asignado__id')
        serializer = AsignacionEstudianteSerializer(queryset, many=True)

        page = request.GET.get('page')
        try: 
            page = self.paginate_queryset(queryset)
        except Exception as e:
            page = []
            data = page
            return Response({
                "status": status.HTTP_404_NOT_FOUND,
                "message": 'No more record.',
                "data" : data
                })
        print('PAGES: ', page)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            data = serializer.data
            return self.get_paginated_response(data) 

        return Response(serializer.data, status=status.HTTP_200_OK)

