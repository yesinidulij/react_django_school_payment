from django.contrib import admin
from .models import SystemUser,payment,Student  # Replace with your actual model name(s)
admin.site.register(payment)
admin.site.register(SystemUser)
admin.site.register(Student)