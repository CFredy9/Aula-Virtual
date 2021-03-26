from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from rest_framework import pagination

from datetime import datetime
from datetime import timedelta

from api.permission import IsStaff, IsCatedratico

from api.models import Evento, Detalle_Curso
from api.serializers import EventoSerializer, EventoRegistroSerializer


class EventoViewset(viewsets.ModelViewSet):
    queryset = Evento.objects.filter(activo=True)
    #permission_classes = (IsStaff,)

    """filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_curso",)
    search_fields = ("nombre_curso",)
    ordering_fields = ("nombre_curso",) """

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EventoSerializer
        else:
            return EventoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @permission_classes([IsCatedratico])
    def list(self, request, *args, **kwargs):
        data = request.query_params
        id=data.get('id')
        queryset = Evento.objects.filter(detalle_curso=id, activo=True).order_by('fecha')
        #queryset = Evento.objects.filter().order_by('id')
        serializer = EventoSerializer(queryset, many=True)

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
                user = request.data
                data = request.data
                #serializer = CatedraticoRegistroSerializer(data=request.data)
                verify = EventoRegistroSerializer(data=data)
                if verify.is_valid():
                    
                    detalle_curso = Detalle_Curso.objects.get(pk=data.get('detalle_curso'))

                    evento = Evento.objects.create(
                        detalle_curso=detalle_curso,
                        nombre=data.get('nombre'),
                        descripcion=data.get('descripcion'),
                        fecha=data.get('fecha')
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

                #now = data.get('fecha')
                #new_date = now + timedelta(days=2)
                #print('FECHAAASS ',new_date)
                verify = EventoRegistroSerializer(data=data)
                if verify.is_valid():

                    evento = Evento.objects.get(pk=pk)
                    id_detalle_curso = data.get('detalle_curso')
                    detalle_curso = Detalle_Curso.objects.get(pk=id_detalle_curso)

                    evento.detalle_curso = detalle_curso
                    evento.nombre = data.get('nombre')
                    evento.descripcion = data.get('descripcion')
                    evento.fecha = data.get('fecha')
                    evento.save()
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
            query = Evento.objects.filter(detalle_curso=id, activo=True)
            serializer = EventoSerializer(query, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)}, status=status.HTTP_400_BAD_REQUEST)