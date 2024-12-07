from django.contrib import admin
from .models import SystemUser,payment  # Replace with your actual model name(s)
admin.site.register(payment)
admin.site.register(SystemUser)