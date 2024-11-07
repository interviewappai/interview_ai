from django.db import models
from django.contrib.auth.models import User
import pymupdf
import io
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
    pdf_buffer = io.BytesIO(pdf_file.read())
    doc = pymupdf.open(stream=pdf_buffer, filetype="pdf")
    
    # Now you can work with the PDF
    # For example, to get text from first page:
    first_page = doc[0]
    text = first_page.get_text()
    return text
