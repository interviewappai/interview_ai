from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    # make resume_data optional
    resume_data = serializers.CharField(required=False)
    class Meta:
        model = UserProfile
        fields = ['name', 'age', 'phone', 'resume_data']
