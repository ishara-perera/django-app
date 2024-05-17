from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin, Group, Permission

# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')

        email=self.normalize_email(email)
        email = email.lower()

        user = self.model(
            email=email,
            **kwargs,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(
            email,
            password=password,
            **kwargs,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    role = models.CharField(max_length=255, default='admin')
    
    is_employee = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=False)

    groups = models.ManyToManyField(Group, blank=True, related_name='user_groups')
    user_permissions = models.ManyToManyField(
        Permission,
        blank=True,
        related_name='user_permissions',
    )

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email
    
class Employee(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='employee')
    emp_code = models.CharField(max_length=255)
    tel_home = models.CharField(max_length=20)
    tel_office = models.CharField(max_length=20)

    def __str__(self):
        return self.user.email

class Customer(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='customer')
    alt_mobile = models.CharField(max_length=20)
    loyalty_status = models.CharField(max_length=20)

    def __str__(self):
        return self.user.email