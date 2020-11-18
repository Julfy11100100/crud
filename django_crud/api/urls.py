from django.urls import path, include
from . import views

urlpatterns = [
    path('users/', views.api_users_list),
    path('user-create/', views.api_users_create),
    path('user-get/<int:pk>/', views.api_user_get),
    path('user-update-post/<int:pk>/', views.api_user_update_post),
    path('user-update-patch/<int:pk>/', views.api_user_update_patch),
    path('user-delete/<int:pk>/', views.api_user_delete),
]