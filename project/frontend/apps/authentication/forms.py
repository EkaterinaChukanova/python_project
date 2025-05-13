from django import forms
from django.core.validators import RegexValidator


class RegistrationForm(forms.Form):
    first_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First Name'}))
    patronymic = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First Name'}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First Name'}))
    email = forms.EmailField(widget=forms.TextInput(attrs={'class': 'form-control'}),
                             validators=[RegexValidator(
                                 r'[A-Za-z0-9_.+-]*@[A-Za-z0-9-]*\.[A-Za-z0-9-]+',
                                 message="This is not email address", )])
    password = forms.CharField(min_length=1, max_length=50,
                               widget=forms.PasswordInput(attrs={'class': 'form-control', 'id': 'password'}),
                               validators=[RegexValidator(
                                   r'[A-Za-z0-9_]*',
                                   message="Password should consist of letters, numbers, underscores",
                               )])


class LoginForm(forms.Form):
    email = forms.EmailField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}))
