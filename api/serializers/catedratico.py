from rest_framework import serializers
from api.models import Catedratico, Profesion
from api.serializers import ProfileRegistroSerializer

class ProfesionRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profesion
        fields = (
            'id',
        )

class ProfesionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profesion
        fields = (
            'nombre_profesion',
        )

class CatedraticoSerializer(serializers.ModelSerializer):
    profile = ProfileRegistroSerializer()
    #profesion = ProfesionSerializer()
    class Meta:
        model = Catedratico
        fields = (
            'id',
            'profile',
            'profesion',
        )
        depth = 2


class CatedraticoRegistroSerializer(serializers.ModelSerializer):

    profile = ProfileRegistroSerializer()
    #profesion = ProfesionRegistroSerializer()
    class Meta:
        model = Catedratico
        fields = (
            'profile',
            'profesion',
        )

