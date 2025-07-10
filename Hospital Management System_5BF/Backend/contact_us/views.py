from rest_framework import viewsets
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from .models import ContactUs
from .serializers import ContactUsSerializer

class ContactUsViewSet(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer

    def perform_create(self, serializer):
        contact_us = serializer.save()  
        subject = "New Contact Us Submission"
        body = render_to_string('contact_us_email.html', {
            'name': contact_us.name,
            'email': contact_us.email,
            'problem': contact_us.problem,
        })

        email = EmailMultiAlternatives(
            subject,
            to=[settings.EMAIL_HOST_USER],  # Send email to admin
        )
        email.attach_alternative(body, "text/html")
        email.send()
