from django.contrib import admin

from apps.education import models

admin.site.register(models.Subject)
admin.site.register(models.Lecture)
