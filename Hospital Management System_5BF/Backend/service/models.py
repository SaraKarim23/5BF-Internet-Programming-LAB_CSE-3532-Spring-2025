from django.db import models
from django.contrib.auth.models import User
from patient.models import Patient
# Create your models here.
class Service(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField()
    image = models.ImageField(upload_to='service/images/')
    fee= models.DecimalField(max_digits=8,decimal_places=2)

    def __str__(self):
        return self.name

class ServiceBooking(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE,null=True, blank=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    booked_at = models.DateTimeField(auto_now_add=True)
    scheduled_date = models.DateField(null=True, blank=True)
    preferable_date = models.DateField()
    is_confirmed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.patient.user.first_name} - {self.service.name}"