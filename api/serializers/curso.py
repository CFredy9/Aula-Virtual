from rest_framework import serializers
from api.models import Curso


class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'


class CursoRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Curso
        fields = (
            'nombre_curso',
        )