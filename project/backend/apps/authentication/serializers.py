from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'first_name', 'last_name', 'password', 'email']





'''
{
"first_name": "Юрий",
"last_name": "Битюков",
"password": "qwerty",
"email": "y.i.bityukov@mail.ru",
}
'''


