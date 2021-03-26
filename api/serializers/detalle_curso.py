from rest_framework import serializers
from api.models import Detalle_Curso


class DetalleCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle_Curso
        fields = (
            'id',
            'curso_asignado',
            'portada',
            'descripcion',
        )
        depth=5


class DetalleCursoRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Detalle_Curso
        fields = (
            'curso_asignado',
            'portada',
            'descripcion',
        )