from django.db import models
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User
from django.utils import timezone
from django.db import models
from uuid import uuid4
# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password

class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not provided a valid e-mail address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(blank=True, default='', unique=True)
    first_name = models.CharField(max_length=255, blank=True, default='')
    last_name = models.CharField(max_length=255, blank=True, default='')
    image = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def get_full_name(self):
        return self.first_name
    
    def get_short_name(self):
        return self.first_name or self.email.split('@')[0]

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

class Fee(models.Model):
       feeid=models.CharField(max_length=20,default=get_random_string(length=20),unique=True)
       name= models.CharField(max_length=50)
       description=models.CharField(max_length=300,blank=True)
       amount=models.IntegerField()
       due_date=models.DateField()



class payment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    fee = models.ForeignKey(Fee, on_delete=models.CASCADE)
    amount=models.IntegerField()
    currency=models.CharField(max_length=10)
    reference=models.CharField(max_length=50)
    payment_date = models.DateTimeField(default=timezone.now)





class ChapaStatus(models.TextChoices):
    CREATED = 'created', 'CREATED'
    PENDING = 'pending', 'PENDING'
    SUCCESS = 'success', 'SUCCESS'
    FAILED = 'failed', 'FAILED'


class ChapaTransactionMixin(models.Model):
    "inherit this model and add your own extra fields"
    id = models.UUIDField(primary_key=True, default=uuid4)

    amount = models.FloatField()
    currency = models.CharField(max_length=25, default='ETB')
    email = models.EmailField()
    phone_number = models.CharField(max_length=25)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    payment_title = models.CharField(max_length=255, default='Payment')
    description = models.TextField()

    status = models.CharField(max_length=50, choices=ChapaStatus.choices, default=ChapaStatus.CREATED)

    response_dump = models.JSONField(default=dict, blank=True)  # incase the response is valuable in the future
    checkout_url = models.URLField(null=True, blank=True)

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return f"{self.first_name} - {self.last_name} | {self.amount}"
    
    def serialize(self) -> dict:
        return {
            'amount': self.amount,
            'currency': self.currency,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'description': self.description
        }

class ChapaTransaction(ChapaTransactionMixin):
    pass
   



