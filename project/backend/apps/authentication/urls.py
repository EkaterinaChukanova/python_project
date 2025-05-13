from django.urls import path

from apps.authentication import views

urlpatterns = [
    path('signup', views.signup),
    path('login', views.login),
    path('verify-token', views.verify_token),

]
