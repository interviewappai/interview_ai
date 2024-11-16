from django.urls import path
from .views import InterviewStartView,SubmitAnswer,InterviewEnd
urlpatterns = [
    path('start', InterviewStartView.as_view(), name='start_interview'),
    path('answer',SubmitAnswer.as_view(),name="submit_answer"),
    path('end',InterviewEnd.as_view(),name="end_interview"),
]
