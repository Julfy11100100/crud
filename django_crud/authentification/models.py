import jwt

from datetime import datetime
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class AuthTokenManager(BaseUserManager):
    """
    Нужно переопределить класс create_user
    """

    def _create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('Указанное имя пользователя должно быть установлено')

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, password=None, **extra_fields):
        return self._create_user(username, password, **extra_fields)


class AuthToken(AbstractBaseUser, PermissionsMixin):
    """
    Определяет наш пользовательский класс.
    Требуется имя пользователя и пароль.
    """

    username = models.CharField(db_index=True, max_length=255, unique=True)

    # Свойство `USERNAME_FIELD` сообщает нам, какое поле мы будем использовать для входа.
    USERNAME_FIELD = 'username'
    objects = AuthTokenManager()

    def __str__(self):
        return self.username

    @property
    def token(self):
        """
        Позволяет нам получить токен пользователя, вызвав `user.token` вместо
        `user.generate_jwt_token().
        """
        return self._generate_jwt_token()

    def _generate_jwt_token(self):
        """
        Создает веб-токен JSON, в котором хранится идентификатор
        этого пользователя и срок его действия
        составляет 60 дней в будущем.
        """
        dt = datetime.now() + timedelta(days=60)
        token = jwt.encode({
            'id': self.pk,
            'exp': int(dt.timestamp())
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')
