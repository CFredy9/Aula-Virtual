from rest_framework import serializers
from api.models import Estudiante
from api.serializers import ProfileRegistroSerializer


class EstudianteSerializer(serializers.ModelSerializer):
    profile = ProfileRegistroSerializer()
    class Meta:
        model = Estudiante
        fields = (
            'id',
            'profile',
            'grado',
            'nombre_contacto',
            'telefono_contacto',
        )
        depth=2

class EstudianteRegistroSerializer(serializers.ModelSerializer):

    profile = ProfileRegistroSerializer()
    class Meta:
        model = Estudiante
        fields = (
            'profile',
            'grado',
            'nombre_contacto',
            'telefono_contacto',
        )
