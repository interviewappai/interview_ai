from django.urls import path
from .views import InterviewStartView
urlpatterns = [
    path('start', InterviewStartView.as_view(), name='interview'),
]
