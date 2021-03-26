from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction

from api.permission import IsStaff, IsCatedratico

from api.models import Asignacion_Curso, Detalle_Curso, Curso, Grado, Seccion, Catedratico, Ciclo_Escolar
from api.serializers import AsignacionCursoSerializer, AsignacionCursoRegistroSerializer, DetalleCursoSerializer


class AsignacionCursoViewset(viewsets.ModelViewSet):
    queryset = Asignacion_Curso.objects.filter(activo=True)
    #queryset = Asignacion_Curso.objects.all()
    #permission_classes = (IsStaff,)

    """filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_grado",)
    search_fields = ("nombre_grado",)
    ordering_fields = ("nombre_grado",) """

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionCursoSerializer
        else:
            return AsignacionCursoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    
    @permission_classes([IsStaff])
    def create(self, request):
        try:
            with transaction.atomic():
                user = request.data
                data = request.data

                #serializer = CatedraticoRegistroSerializer(data=request.data)
                verify = AsignacionCursoRegistroSerializer(data=data)
                if verify.is_valid():

                    curso = Curso.objects.get(pk=data.get('curso'))
                    grado = Grado.objects.get(pk=data.get('grado'))
                    seccion = Seccion.objects.get(pk=data.get('seccion'))
                    catedratico = Catedratico.objects.get(pk=data.get('catedratico'))
                    ciclo_escolar = Ciclo_Escolar.objects.get(pk=data.get('ciclo_escolar'))

                    asignacion_curso = Asignacion_Curso.objects.create(
                        curso=curso,
                        grado=grado,
                        seccion=seccion,
                        catedratico=catedratico,
                        ciclo_escolar=ciclo_escolar
                    )

                    detalle_curso = Detalle_Curso.objects.create(
                        curso_asignado=asignacion_curso,
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
                verify = AsignacionCursoRegistroSerializer(data=data)
                if verify.is_valid():

                    asignacion_curso = Asignacion_Curso.objects.get(pk=pk)
                    id_curso = data.get('curso')
                    curso = Curso.objects.get(pk=id_curso)
                    id_grado = data.get('grado')
                    grado = Grado.objects.get(pk=id_grado)
                    id_seccion = data.get('seccion')
                    seccion = Seccion.objects.get(pk=id_seccion)
                    id_catedratico = data.get('catedratico')
                    catedratico = Catedratico.objects.get(pk=id_catedratico)
                    id_ciclo_escolar = data.get('ciclo_escolar')
                    ciclo_escolar = Ciclo_Escolar.objects.get(pk=id_ciclo_escolar)

                    asignacion_curso.curso = curso
                    asignacion_curso.grado = grado
                    asignacion_curso.seccion = seccion
                    asignacion_curso.catedratico = catedratico
                    asignacion_curso.ciclo_escolar = ciclo_escolar
                    asignacion_curso.save()
                else:
                    return Response({"detail":str(verify.errors)}, status=status.HTTP_400_BAD_REQUEST)
            return Response(verify.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def cursos(self, request, *args, **kwargs):
        #queryset =self.filter_queryset(Asignacion_Estudiante.objects.all().order_by('id'))
        user = request.user
        queryset = Detalle_Curso.objects.filter(curso_asignado__catedratico__profile__user=user, activo=True)
        serializer = DetalleCursoSerializer(queryset, many=True)

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

        #serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MisCursos(viewsets.ModelViewSet):

    serializer_class = DetalleCursoSerializer
    queryset = Detalle_Curso.objects.filter(activo=True)
    serializer = serializer_class(queryset)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def list(self, request, *args, **kwargs):
        #queryset =self.filter_queryset(Asignacion_Estudiante.objects.all().order_by('id'))
        user = request.user
        queryset = Detalle_Curso.objects.filter(curso_asignado__catedratico__profile__user=user, activo=True).order_by('id')
        #queryset = Asignacion_Curso.objects.filter().order_by('id')
        serializer = DetalleCursoSerializer(queryset, many=True)

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
        

   
