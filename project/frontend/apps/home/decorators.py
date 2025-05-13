import requests
from django.http import HttpResponse
from django.shortcuts import redirect


def logged_in(func):
    def wrapper(request, *args, **kwargs):
        token = request.COOKIES.get('token')
        if not token:
            return redirect('/auth/login/')
        try:
            response = requests.get(
                'http://backend:8000/auth/verify-token/',  # Укажи свой URL
                headers={'Authorization': f'Token {token}'}
            )
            if response.status_code != 200:
                return redirect('/auth/login/')
        except Exception as e:
            return HttpResponse(str(e))

        func(request, *args, **kwargs)

    return wrapper
