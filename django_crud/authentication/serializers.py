from django.contrib.auth import authenticate
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    """
    Аутентифицирует существующего пользователя.
    username и password обязательны.
    Возвращает веб-токен.
    """

    username = serializers.CharField(max_length=255, write_only=True)
    password = serializers.CharField(max_length=128, write_only=True)

    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        """
        Валидация данных.
        """
        username = data.get('username', None)
        password = data.get('password', None)

        if username is None:
            raise serializers.ValidationError(
                'username обязателен.'
            )

        if password is None:
            raise serializers.ValidationError(
                'password обязателен.'
            )

        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError(
                'User с таким паролем не найден.'
            )

        return {
            'token': user.token,
        }
