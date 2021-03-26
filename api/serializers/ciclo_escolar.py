from rest_framework import serializers
from api.models import Ciclo_Escolar


class Ciclo_EscolarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciclo_Escolar
        fields = '__all__'


class Ciclo_EscolarRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ciclo_Escolar
        fields = (
            'nombre_ciclo_escolar',
        )