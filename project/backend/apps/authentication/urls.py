from django.urls import path

from apps.authentication import views

urlpatterns = [
    path('signup', views.signup, name='signup'),
    path('login', views.login, name='login'),
    path('test', views.test_token, name='test'),

]
