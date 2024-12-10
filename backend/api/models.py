from django.db import models

# Create your models here.

class Student(models.Model):
    student_id = models.AutoField(primary_key=True)
    first_name=models.CharField(max_length=50,null=True)
    last_name=models.CharField(max_length=50,null=True)
    email=models.CharField(max_length=50,null=True)
    phone=models.CharField(max_length=15,null=True)
    
    
class SystemUser(models.Model):
    username=models.CharField(max_length=50,null=True)
    password=models.CharField(max_length=50,null=True)
    first_name=models.CharField(max_length=50,null=True)
    last_name=models.CharField(max_length=50,null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    mobile=models.CharField(max_length=50,null=True)
    email=models.CharField(max_length=50,null=True)
    gender=models.CharField(max_length=50,null=True)
    role=models.CharField(max_length=50,default="user")

   
class payment(models.Model):
    customer=models.ForeignKey(SystemUser,on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    amount=models.IntegerField()
    transation_reference=models.CharField(max_length=50,null=True)
    public_key=models.CharField(max_length=1000,null=True)



