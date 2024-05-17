from django.contrib import admin
from .models import Product, Order, Type, Review, Question

# Register your models here.
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Type)
admin.site.register(Review)
admin.site.register(Question)