from django.urls import path
from .views import InterviewStartView,SubmitAnswer
urlpatterns = [
    path('start', InterviewStartView.as_view(), name='start_interview'),
    path('answer',SubmitAnswer.as_view(),name="submit_answer")
]
