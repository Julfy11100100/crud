from django.core.validators import RegexValidator
from django.db import models


class User(models.Model):
    """
    Модель юзеров для crud
    """
    id = models.AutoField(primary_key=True)
    username = models.CharField(blank=False, max_length=150)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    password = models.CharField(blank=False, max_length=128)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(auto_now_add=True, blank=True)
    is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return self.username
