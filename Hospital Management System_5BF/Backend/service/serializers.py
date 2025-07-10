from rest_framework import serializers
from .models import Service,ServiceBooking
from patient.serializers import PatientSerializer
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class ServiceBookingSerializer(serializers.ModelSerializer):
    service_name = serializers.SerializerMethodField()
    class Meta:
        model = ServiceBooking
        fields = '__all__'

    def get_service_name(self, obj):
        return obj.service.name if obj.service and obj.service.name else None

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['patient'] = request.user.patient
        return super().create(validated_data)

    