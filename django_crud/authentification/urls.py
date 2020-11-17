from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_test),
    path('get-token/', views.api_get_token),
]
