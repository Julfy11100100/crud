from django.urls import path, include
from . import views

urlpatterns = [
    path('users/', views.api_users_list),
    path('user-create/', views.api_users_create),
]