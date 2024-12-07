from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, SystemUserSerializer,paymentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import SystemUser,payment
# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class paymentListCreate(generics.ListCreateAPIView):
    serializer_class = paymentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return payment.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class createSystemUser(generics.CreateAPIView):
    queryset = SystemUser.objects.all()
    serializer_class = SystemUserSerializer
    permission_classes = [AllowAny]

class getUser(generics.RetrieveAPIView):
    queryset = SystemUser.objects.all()
    serializer_class = UserSerializer
