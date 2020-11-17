from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny


@api_view(['GET'])
@permission_classes([AllowAny])
def test(request):
    return HttpResponse('<h1>Hello, World!</h1>', status=200)
