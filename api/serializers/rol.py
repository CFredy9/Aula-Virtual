from rest_framework import serializers
from api.models import Rol


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'


class RolRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rol
        fields = (
            'nombre_rol',
        )