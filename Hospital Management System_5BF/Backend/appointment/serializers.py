from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    # patient = serializers.StringRelatedField(many=False)
    # doctor = serializers.StringRelatedField(many=False)
    # time = serializers.StringRelatedField(many=False)
    doctor_specialization = serializers.SerializerMethodField()
    fees = serializers.SerializerMethodField()
    doctor_name = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = '__all__'  
        extra_fields = ['doctor_name', 'doctor_specialization', 'fees']

    def get_doctor_name(self, obj):
        return f"Dr. {obj.doctor.user.first_name} {obj.doctor.user.last_name}" if obj.doctor else None
    def get_doctor_specialization(self, obj):
        return obj.doctor.specialization.name if obj.doctor and obj.doctor.specialization else None

    def get_fees(self, obj):
        return obj.doctor.fee if obj.doctor else None