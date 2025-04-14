from django.db import models

from apps.core.models import Organization, Faculty


# Create your models here.


class Employee(models.Model):
    first_name = models.CharField(max_length=30, null=False)
    patronymic = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    email = models.EmailField(null=False)
    phone = models.CharField(max_length=15, null=False)
    organization = models.ForeignKey(Organization, null=True, on_delete=models.SET_NULL)
    faculty = models.ForeignKey(Faculty, null=True, on_delete=models.SET_NULL)

    def get_name(self):
        return f'{self.last_name} {self.first_name[0]}. {self.patronymic[0]}.'

    def __str__(self):
        return (f"Tutor("
                f"id: {self.id}, "
                f"name: {self.get_name()}, "
                f"email: {self.email}, "
                f"phone: {self.phone}, "
                f"organization: {self.organization.short_name}, "
                f"faculty: {self.faculty.number}"
                f")")
