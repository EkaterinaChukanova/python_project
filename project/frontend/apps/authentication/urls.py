from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register),
    path('login', views.login),
    # path('test_token', views.test_token),
    # path('test_token_1', views.test_token_1),
]