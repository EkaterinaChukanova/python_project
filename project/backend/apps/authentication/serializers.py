from rest_framework import serializers

from apps.authentication.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'password', 'email']


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'password']


class LoginSerializer(serializers.Serializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'password']


'''
{
"first_name": "Юрий",
"last_name": "Битюков",
"password": "qwerty",
"email": "y.i.bityukov@mail.ru",
}
'''
