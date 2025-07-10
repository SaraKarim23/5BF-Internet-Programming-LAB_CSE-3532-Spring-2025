from django.shortcuts import render
from rest_framework import viewsets
from . import models
# from doctor.models import Review
from . import serializers
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from rest_framework import generics, filters

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = models.Doctor.objects.all()
    serializer_class = serializers.DoctorSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__first_name', 'user__last_name','specialization__name']

class SpecializationViewSet(viewsets.ModelViewSet):
    queryset = models.Specialization.objects.all()
    serializer_class = serializers.SpecializationSerializer

class AvailableTimeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = serializers.AvailableTimeSerializer
    queryset = models.AvailableTime.objects.all()
    
    def get_queryset(self):
        queryset = models.AvailableTime.objects.all()
        doctor_id = self.request.query_params.get('doctor_id')  
        if doctor_id:
            return models.AvailableTime.objects.filter(doctor__id=doctor_id)
        return models.AvailableTime.objects.all()

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = models.Review.objects.all()
    serializer_class = serializers.ReviewSerializer
    def get_queryset(self):
        doctor_id = self.request.query_params.get('doctor')
        if doctor_id:
            return models.Review.objects.filter(doctor_id=doctor_id)
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(reviewer=self.request.user.patient)