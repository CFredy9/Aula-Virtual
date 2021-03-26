from rest_framework import serializers
from api.models import Profesion


class ProfesionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesion
        fields = '__all__'


class ProfesionRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profesion
        fields = (
            'nombre_profesion',
        )