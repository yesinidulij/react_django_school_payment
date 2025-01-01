from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import SystemUser,payment,Student,Fee
from django.contrib.auth.hashers import make_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","first_name","last_name","email" ,"password"]
        extra_kwargs = {"password": {"write_only": True}}
   
     
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class SystemUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SystemUser
        fields = ("id",'username','password','first_name', 'last_name', 'mobile', 'email', 'gender')

    def create(self, validated_data):
        print(validated_data)
        user = SystemUser.objects.create(**validated_data)
        return user

class paymentSerializer(serializers.ModelSerializer):
     class Meta:
        model = payment
        fields = ["id", "student", "amount","currency", "reference","payment_date"]
        extra_kwargs = {"payment_date": {"read_only": True}}


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class FeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Fee
        fields=["id","feeid","name","description","amount","due_date"]
        extra_kwargs = {"feeid": {"read_only": True}}


