from rest_framework import serializers
from api.models import Grado, Nivel

class NivelRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Nivel
        fields = (
            'id',
        ) 

class NivelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Nivel
        fields = (
            'nombre_nivel',
        )

class GradoSerializer(serializers.ModelSerializer):
    #nivel = NivelSerializer()
    class Meta:
        model = Grado
        fields = (
            'id',
            'nivel',
            'nombre_grado',
        )
        depth = 1

class GradoRegistroSerializer(serializers.ModelSerializer):
    #nivel = NivelRegistroSerializer()
    class Meta:
        model = Grado
        fields = (
            'nivel',
            'nombre_grado',
        )
