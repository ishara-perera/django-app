from django.db import models
from django.utils import timezone
from accounts.models import UserAccount

# Create your models here.
class Type(models.Model):
    name = models.CharField(max_length=20)
    language = models.CharField(max_length=10)
    translated_languages = models.JSONField(default=list)  # Add translated_languages field
    slug = models.CharField(max_length=20)
    banners = models.JSONField(default=list)
    promotional_sliders = models.JSONField(default=list)
    settings = models.JSONField(default=dict)
    icon = models.CharField(max_length=20, default='default_icon') 
    
    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, default='default-slug')  # Add this field
    description = models.TextField()  # Modify to TextField to accommodate longer descriptions
    type = models.ForeignKey(Type, on_delete=models.CASCADE, default=None)  # Add this field
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # shop foreignKey
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    language = models.CharField(max_length=10)
    min_price = models.DecimalField(max_digits=10, decimal_places=2)
    max_price = models.DecimalField(max_digits=10, decimal_places=2)
    sku = models.CharField(max_length=50) # unidentified attribute
    quantity = models.PositiveIntegerField()
    in_stock = models.BooleanField(default=True)
    is_taxable = models.BooleanField(default=False)
    # shipping class foreignKey
    status = models.CharField(max_length=20, default='publish')  # Add status field with default value
    product_type = models.CharField(max_length=20, default='simple')
    unit = models.CharField(max_length=50)
    discount = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.JSONField(default=dict)  # Add this field
    gallery = models.JSONField(default=list)  # Add this field
    popular_product = models.BooleanField(default=False)
    created_by = models.ForeignKey(UserAccount, related_name='products_created', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(UserAccount, related_name='products_updated', on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.name

class Order(models.Model):
    tracking_number = models.CharField(max_length=100)
    customer = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    customer_contact = models.CharField(max_length=20, default='1111')
    customer_name = models.CharField(max_length=255, default='cutomer_name')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    sales_tax = models.DecimalField(max_digits=10, decimal_places=2)
    paid_total = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.TextField(blank=True)
    cancelled_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cancelled_tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cancelled_delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    language = models.CharField(max_length=10)
    coupon_id = models.IntegerField(null=True, blank=True)
    parent_id = models.IntegerField(null=True, blank=True)
    shop_id = models.IntegerField(null=True, blank=True)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_gateway = models.CharField(max_length=100)
    altered_payment_gateway = models.CharField(max_length=100, null=True, blank=True)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_time = models.CharField(max_length=100)
    order_status = models.CharField(max_length=100)
    payment_status = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)
    logistics_provider = models.CharField(max_length=100, null=True, blank=True)
    
    shipping_address_zip = models.CharField(max_length=20)
    shipping_address_city = models.CharField(max_length=100)
    shipping_address_state = models.CharField(max_length=100)
    shipping_address_country = models.CharField(max_length=100)
    shipping_address_street_address = models.CharField(max_length=255)
    
    billing_address_zip = models.CharField(max_length=20, default='default billing zip')
    billing_address_city = models.CharField(max_length=100, default='default billing city')
    billing_address_state = models.CharField(max_length=100, default='default billing address')
    billing_address_country = models.CharField(max_length=100, default='default billing country')
    billing_address_street_address = models.CharField(max_length=255, default='default billing address street')

    def __str__(self):
        return f"Order #{self.tracking_number} by {self.customer_name}"

class Review(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    comment = models.TextField()
    rating = models.IntegerField()
    photos = models.JSONField(default=list)
    deleted_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    positive_feedbacks_count = models.IntegerField(default=0)
    negative_feedbacks_count = models.IntegerField(default=0)
    my_feedback = models.CharField(max_length=10, null=True, blank=True)
    abusive_reports_count = models.IntegerField(default=0)

    def __str__(self):
        return f"Review for {self.product.name} by {self.user.username}"
class Question(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    shop_id = models.IntegerField()
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    question = models.TextField()
    answer = models.TextField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    positive_feedbacks_count = models.IntegerField(default=0)
    negative_feedbacks_count = models.IntegerField(default=0)
    my_feedback = models.CharField(max_length=10, blank=True, null=True)
    abusive_reports_count = models.IntegerField(default=0)

    def __str__(self):
        return f"Question: {self.question}"