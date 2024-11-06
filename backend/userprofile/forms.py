from django import forms
from .models import UserProfile

class UserProfileForm(forms.ModelForm):
    resume_pdf = forms.FileField(required=False)

    class Meta:
        model = UserProfile
        fields = ['name', 'age', 'phone', 'resume_data']
