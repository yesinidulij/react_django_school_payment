from django.contrib import admin
from .models import ChapaTransaction
from .models import SystemUser,payment,Student ,Fee,User # Replace with your actual model name(s)
admin.site.register(payment)
admin.site.register(SystemUser)
admin.site.register(Student)
admin.site.register(Fee)
admin.site.register(User)

class ChapaTransactionAdmin(admin.ModelAdmin):
    list_display = 'first_name', 'last_name', 'email', 'amount', 'currency', 'status'


admin.site.register(ChapaTransaction, ChapaTransactionAdmin)