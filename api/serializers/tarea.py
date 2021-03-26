from rest_framework import serializers
from api.models import Tarea


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = (
            'id',
            'detalle_curso',
            'titulo',
            'descripcion',
            'valor_tarea',
            'archivo',
            'fecha',
        )
        

class TareaRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tarea
        fields = (
            'detalle_curso',
            'titulo',
            'descripcion',
            'valor_tarea',
            'fecha',
        )