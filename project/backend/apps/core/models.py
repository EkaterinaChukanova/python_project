from django.db import models


# Create your models here.


class Equipment(models.Model):
    name = models.CharField(max_length=100, null=False, unique=True)

    def __str__(self):
        return self.name


class Organization(models.Model):
    short_name = models.CharField(max_length=10, unique=True)
    full_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.short_name


class Location(models.Model):
    building = models.CharField(max_length=100, unique=True, null=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.organization.short_name}, Корпус {self.building}"


class Faculty(models.Model):
    name = models.CharField(max_length=100, unique=True)
    number = models.IntegerField()

    def __str__(self):
        return str(self.number)
