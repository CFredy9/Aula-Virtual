
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.permission import IsStaff

from api.models import Profesion
from api.serializers import ProfesionSerializer, ProfesionRegistroSerializer


class ProfesionViewset(viewsets.ModelViewSet):
    queryset = Profesion.objects.filter(activo=True)
    #permission_classes = (IsStaff,)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre_profesion",)
    search_fields = ("nombre_profesion",)
    ordering_fields = ("nombre_profesion",)

    def get_serializer_class(self): 
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProfesionSerializer
        else:
            return ProfesionRegistroSerializer

    def get_permissions(self): 
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated, IsStaff]
        return [permission() for permission in permission_classes]