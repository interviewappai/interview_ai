from django.urls import path
from . import views

urlpatterns = [
    path('', views.profile_detail, name='profile_detail'),
    path('create/', views.profile_create, name='profile_create'),
    path('update/', views.profile_update, name='profile_update'),
    path('health-check/', views.health_check, name='health_check'),
]
