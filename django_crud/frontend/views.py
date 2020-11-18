from django.shortcuts import render


def crud(request):
    return render(request, 'frontend/crud.html')
