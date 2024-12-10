from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, SystemUserSerializer,paymentSerializer,StudentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import SystemUser,payment,Student
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
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

class studentListView(generics.ListCreateAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        user = self.request.user
        return Student.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user





class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_data = {
            'username': request.user.username,
            'email': request.user.email,
        }
        return Response(user_data)
