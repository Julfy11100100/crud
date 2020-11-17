from django.http import HttpResponse
from django.shortcuts import render


def test(request):
    return HttpResponse('<h1>Hello, World!</h1>', status=200)
