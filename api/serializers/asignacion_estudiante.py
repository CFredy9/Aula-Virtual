from rest_framework import serializers
from api.models import Asignacion_Estudiante

class AsignacionEstudianteSerializer(serializers.ModelSerializer):
    detalle = serializers.FloatField(default=0)
    punteo = serializers.FloatField(default=0)
    class Meta:
        model = Asignacion_Estudiante
        fields = (
            'id',
            'curso_asignado',
            'estudiante',
            'detalle',
            'punteo'
        )
        depth = 4


class AsignacionEstudianteRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Asignacion_Estudiante
        fields = (
            'curso_asignado',
            'estudiante',
        )