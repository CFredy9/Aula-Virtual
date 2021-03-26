from rest_framework import serializers
from api.models import Asignacion_Curso

class AsignacionCursoSerializer(serializers.ModelSerializer):
    tareas = serializers.FloatField(default=0)
    class Meta:
        model = Asignacion_Curso
        fields = (
            'id',
            'curso',
            'seccion',
            'grado', 
            'catedratico',
            'ciclo_escolar',
            'tareas',
        )
        depth = 4


class AsignacionCursoRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Asignacion_Curso
        fields = (
            'curso',
            'seccion',
            'grado', 
            'catedratico',
            'ciclo_escolar',
        )