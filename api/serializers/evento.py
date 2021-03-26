from rest_framework import serializers
from api.models import Evento


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = (
            'id',
            'detalle_curso',
            'nombre',
            'descripcion',
            'fecha',
        )


class EventoRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Evento
        fields = (
            'detalle_curso',
            'nombre',
            'descripcion',
            'fecha',
        )