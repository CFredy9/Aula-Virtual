from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction

from django.db.models import Sum, Count

from api.permission import IsStaff

from api.models import Ciclo_Escolar
from api.serializers import Ciclo_EscolarSerializer, Ciclo_EscolarRegistroSerializer


class Ciclo_EscolarViewset(viewsets.ModelViewSet):
    queryset = Ciclo_Escolar.objects.filter(activo=True)
    #permission_classes = (IsStaff,)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_ciclo_escolar",)
    search_fields = ("nombre_ciclo_escolar",)
    ordering_fields = ("nombre_ciclo_escolar",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return Ciclo_EscolarSerializer
        else:
            return Ciclo_EscolarRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated, IsStaff]
        return [permission() for permission in permission_classes]

    @action(methods=["get"], detail=False)
    def total_ciclos(self, request, *args, **kwargs):
        user = request.user
        queryset = Ciclo_Escolar.objects.filter(
            activo=True
            ).aggregate(
                total=Count(
                    'id'
                    ), 
                )
        return Response(queryset, status=status.HTTP_200_OK)