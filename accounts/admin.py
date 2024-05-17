from django.contrib import admin
from .models import UserAccount, Employee, Customer

# Register your models here.
admin.site.register(UserAccount)
admin.site.register(Employee)
admin.site.register(Customer)