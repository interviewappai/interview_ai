from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    phone = models.CharField(max_length=15)
    resume_data = models.TextField()

    def __str__(self):
        return self.name

def parse_pdf(pdf_file):
    # Dummy function for parsing PDF
    # TODO: Implement actual PDF parsing logic
    return "Dummy parsed content from PDF"
