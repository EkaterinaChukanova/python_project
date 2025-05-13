from django.shortcuts import render
from ..home.decorators import logged_in

# Create your views here.
@logged_in
def home(request):
    return None