from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from apps.auditoriums.models import Auditorium


# Create your models here.


class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLES = (
        ('admin', 'Администратор'),
        ('moderator', 'Модератор'),
        ('teacher', 'Преподаватель'),
    )

    role = models.CharField(max_length=50, choices=ROLES, blank=True, null=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100, blank=True, null=True)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    patronymic = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)

    available_auditoriums = models.ManyToManyField(Auditorium, on_delete=models.SET_NULL, blank=True, null=True)
    booking_limit = models.PositiveIntegerField(blank=True, null=True)



