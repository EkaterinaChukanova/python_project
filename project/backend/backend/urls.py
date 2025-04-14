from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auditoriums', include('apps.auditoriums.urls')),
    path('', include('apps.authentication.urls')),
    path('core', include('apps.core.urls')),
    path('education', include('apps.education.urls')),
    path('employees', include('apps.employees.urls')),
]

