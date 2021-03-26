from rest_framework import serializers
from api.models import Calificacion_Tarea


class CalificacionTareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calificacion_Tarea
        fields = (
            'id',
            'estudiante',
            'tarea',
            'descripcion',
            'documento',
            'nota',
        )
        depth=4


class CalificacionTareaRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Calificacion_Tarea
        fields = (
            'estudiante',
            'tarea',
            'descripcion',
            'documento',
            'nota',
        )