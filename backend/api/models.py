from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class SystemUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name=models.CharField(max_length=50,null=True)
    last_name=models.CharField(max_length=50,null=True)
    mobile=models.CharField(max_length=50,null=True)
    email=models.CharField(max_length=50,null=True)
    gender=models.CharField(max_length=50,null=True)
    role=models.CharField(max_length=50,default="user")

   
class payment(models.Model):
    customer_name=models.CharField(max_length=100,null=True)
    email=models.CharField(max_length=50,null=True)
    phone=models.CharField(max_length=15,null=True)
    amount=models.IntegerField()
    transation_reference=models.CharField(max_length=50,null=True)
    public_key=models.CharField(max_length=1000,null=True)

class Students(models.Model):
    first_name=models.CharField(max_length=50,null=True)
    last_name=models.CharField(max_length=50,null=True)
    email=models.CharField(max_length=50,null=True)
    phone=models.CharField(max_length=15,null=True)
