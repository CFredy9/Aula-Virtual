from rest_framework import serializers
from api.models import Nivel, Ciclo_Escolar

class NivelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivel
        fields = (
            'id',
            'nombre_nivel',
        )
        depth = 1

class NivelRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Nivel
        fields = (
            'nombre_nivel',
        )
