from django.contrib import admin

from apps.employees import models

admin.site.register(models.Employee)
