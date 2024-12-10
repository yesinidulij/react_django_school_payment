from django.contrib.auth.models import User
from rest_framework import serializers
from .models import SystemUser,payment,Student


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","first_name","last_name","email" ,"password"]
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
        fields = ["id", "customer_name", "email","phone", "amount","transation_reference","public_key"]

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


