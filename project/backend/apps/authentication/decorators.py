from celery.bin.control import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status


def authenticated(func):
    def wrapper(request, *args, **kwargs):
        token = request.COOKIES.get('token')
        if not token or not Token.objects.filter(token=token).exists():
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        func(request, *args, **kwargs)

    return wrapper
