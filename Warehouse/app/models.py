from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator 

# Create your models here.

STATE_CHOICES =(
    ('Dhaka','Dhaka'),
    ('Barishal','Barishal'),
    ('Khulna','Khulna'),
    ('Rajshahi','Rajshahi'),
    ('Sylhet','Sylhet'),
    ('Chattogram','Chattogram'),
    ('Rangpur','Rangpur'),
    ('Mymensingh','Mymensingh'),
    ('Cumilla','Cumilla'), 
)
class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) # this will create a foreign key to the default
    name = models.CharField(max_length=200)
    locality = models.CharField(max_length=200)
    city = models.CharField(max_length=50)
    zipcode = models.IntegerField()
    state = models.CharField(choices=STATE_CHOICES, max_length=50)


def __str__(self):
    return str(self.id)


CATEGORY_CHOICES = (
    ('MW', 'Man Wear'),  # Man Wear
    ('WW', 'Women Wear'),  # Women Wear
    ('BW', 'Baby Wear'),  # Baby Wear
    ('M', 'Mobile'),
    ('L', 'Laptop'),
)

SUBCATEGORY_CHOICES = (
    ('Topwear', 'Top Wear'),
    ('Bottomwear', 'Bottom Wear'),
)

class Product(models.Model):
    title = models.CharField(max_length=100)
    selling_price = models.FloatField()
    discounted_price = models.FloatField()
    description = models.TextField()
    brand = models.CharField(max_length=100)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=2)
    subcategory = models.CharField(choices=SUBCATEGORY_CHOICES, max_length=10, blank=True, null=True)
    product_image = models.ImageField(upload_to='productimg')



def __str__(self):
    return str(self.title)


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return str(self.id)
    
    @property
    def total_cost(self):
        return self.quantity * self.product.discounted_price


STATE_CHOICES = (
    ('Accepted', 'Accepted'),
    ('Packed', 'Packed'),
    ('On The Way', 'On the way'),
    ('Delivered', 'Delivered'),
    ('Cancel', 'Cancel')
)


class OrderPlaced(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    customer =models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default =1)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=STATE_CHOICES, max_length=50, default='Pending')

    @property
    def total_cost(self):
        return self.quantity * self.product.discounted_price
    