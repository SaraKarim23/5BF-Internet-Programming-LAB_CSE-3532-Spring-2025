from django.contrib import admin
from . import models
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['doctor_first_name', 'doctor_last_name', 'appointment_types', 'appointment_status', 'symptom', 'time', 'cancel']
    
    def doctor_first_name(self, obj): 
        return obj.doctor.user.first_name 

    def doctor_last_name(self, obj): 
        return obj.doctor.user.last_name 

    def save_model(self, request, obj, form, change):
        if obj.appointment_status == 'Running' and obj.appointment_types == 'Online':
            email_subject = "Your Online Appointment is running"
            email_body = render_to_string('appointment_email.html', {
                    'patient_name': obj.patient.user.first_name,
                    'doctor_name': obj.doctor.user.get_full_name(),
                    'date': obj.scheduled_date,
                    'time': obj.time,
                     'meet_link': obj.doctor.meet_link,
                })
            email = EmailMultiAlternatives(email_subject,'',to=[obj.patient.user.email])
            email.attach_alternative(email_body,"text/html")
            email.send()
        return super().save_model(request, obj, form, change)
admin.site.register(models.Appointment, AppointmentAdmin)
