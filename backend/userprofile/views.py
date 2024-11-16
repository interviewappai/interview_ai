from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import UserProfile, parse_pdf
from .serializers import UserProfileSerializer

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_detail(request):
    profile, created = UserProfile.objects.get_or_create(user=request.user)
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile_create(request):
    if UserProfile.objects.filter(user=request.user).exists():
        return Response({"detail": "Profile already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        profile = serializer.save(user=request.user)
        if 'resume_pdf' in request.FILES:
            pdf_content = parse_pdf(request.FILES['resume_pdf'])
            profile.resume_data = pdf_content
            profile.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile_update(request):
    profile = get_object_or_404(UserProfile, user=request.user)
    serializer = UserProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        profile = serializer.save()
        if 'resume_pdf' in request.FILES:
            pdf_content = parse_pdf(request.FILES['resume_pdf'])
            profile.resume_data = pdf_content
            profile.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
# allow any user to access this endpoint
def health_check(request):
    return Response({"status": "ok"})
