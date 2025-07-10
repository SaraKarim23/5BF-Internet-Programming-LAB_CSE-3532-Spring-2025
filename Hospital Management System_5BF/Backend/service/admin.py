from django.contrib import admin
from .models import Service, ServiceBooking
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
# Register your models here.

class ServiceBookingAdmin(admin.ModelAdmin):
    list_display = ['patient', 'service', 'preferable_date', 'scheduled_date', 'is_confirmed']

    def save_model(self, request, obj, form, change):
        if obj.is_confirmed:
            email_subject = "Your Service Booking is Confirmed"
            email_body = render_to_string('serviceBooking.html', {
                'name': obj.patient.user.first_name,
                'service': obj.service.name,
                'scheduled_date': obj.scheduled_date
            })
            email = EmailMultiAlternatives(email_subject, to=[obj.patient.user.email])
            email.attach_alternative(email_body, "text/html")
            email.send()
        return super().save_model(request, obj, form, change)


admin.site.register(Service)
admin.site.register(ServiceBooking,ServiceBookingAdmin)