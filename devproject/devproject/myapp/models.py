# models.py
from django.db import models

class Employee(models.Model):  
    name = models.CharField(max_length=100)  
    email = models.EmailField()  
    contact = models.CharField(max_length=15)
    package_name = models.CharField(max_length=100, null=True, blank=True)  # New field for Package Name
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # New field for Price
    
    class Meta:  
        db_table = "tblemployee"
