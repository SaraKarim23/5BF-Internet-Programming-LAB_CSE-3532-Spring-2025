from django.shortcuts import render
from rest_framework import viewsets
from .models import ServiceBooking,Service
from .serializers import ServiceBookingSerializer,ServiceSerializer
from rest_framework.permissions import IsAuthenticated

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ServiceBookingViewSet(viewsets.ModelViewSet):
    queryset = ServiceBooking.objects.all()
    serializer_class = ServiceBookingSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        patient_id = self.request.query_params.get('patient_id')
        if patient_id:
            queryset = queryset.filter(patient_id=patient_id)
        return queryset
    
    def get_serializer_context(self):
        return {'request': self.request}
