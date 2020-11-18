import re

from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Создать нового User.
    Username и password обязательны.
    """

    username = serializers.CharField(min_length=1, max_length=150, required=True)
    password = serializers.CharField(min_length=8, max_length=128, required=True)
    first_name = serializers.CharField(max_length=30, required=False, allow_blank=True)
    last_name = serializers.CharField(max_length=30, required=False, allow_blank=True)
    is_active = serializers.BooleanField(required=False)
    last_login = serializers.DateTimeField(read_only=True, required=False)
    is_superuser = serializers.BooleanField(read_only=True, required=False)

    class Meta:
        model = User
        fields = '__all__'

    def validate(self, data):
        username = data.get('username', None)
        password = data.get('password', None)

        if not re.match('^[\\w.@+-]+$', username):
            raise serializers.ValidationError(
                'Некорректные данные поля username.'
            )

        if not re.match('^(?=.*[A-Z])(?=.*\\d).{8,}$', password):
            raise serializers.ValidationError(
                'Некорректные данные поля password.'
            )

        return data

    def create(self, validated_data):
        return User.objects.create(**validated_data)



