from django.core.validators import RegexValidator
from django.db import models


class User(models.Model):
    """
    Модель юзеров для crud
    """
    id = models.AutoField(primary_key=True)
    username = models.CharField(
        blank=False, max_length=150,
        validators=[
            RegexValidator(
                regex='^[\\w.@+-]+$',
                message='Некорректные входные данные username',
                code='invalid_username'
            ),
        ]
    )
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    password = models.CharField(
        blank=False, max_length=128,
        validators=[
            RegexValidator(
                regex='^(?=.*[A-Z])(?=.*\\d).{8,}$',
                message='Некорректные входные данные password',
                code='invalid_password'
            ),
        ]
    )
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField()
    is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return self.username
