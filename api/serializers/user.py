from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Profile

class UserReadSerializer(serializers.ModelSerializer):
    #profile = ProfileRegistroSerializer()
    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        )
        depth=1

class UserRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'first_name',
            'last_name',
            'password'
        )

class ProfileRegistroSerializer(serializers.ModelSerializer):
    user = UserRegistroSerializer()
    class Meta:
        model = Profile
        fields = (
            'user', 
            'avatar',
            'phone',
            'address',
            'gender',
            'rol',
        )
        depth=2
















"""class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'first_name',
            'last_name',
            'profile',
            'password'
        )


class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        ) """
