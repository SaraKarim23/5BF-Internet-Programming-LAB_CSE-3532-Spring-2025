from rest_framework import serializers
from .models import Doctor,Specialization,AvailableTime,Review
from patient.serializers import PatientSerializer

class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = '__all__'

class AvailableTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableTime
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.SerializerMethodField()
    reviewer_image = serializers.SerializerMethodField()  # ✅ Add this

    class Meta:
        model = Review
        fields = '__all__'

    def get_reviewer_name(self, obj):
        return obj.reviewer.user.username if obj.reviewer and obj.reviewer.user else None

    def get_reviewer_image(self, obj):
        request = self.context.get('request')
        if obj.reviewer and obj.reviewer.image:
            image_url = obj.reviewer.image.url

            if request:
                return request.build_absolute_uri(image_url)
            return image_url
        return None


class DoctorSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=False)
    full_name = serializers.SerializerMethodField()
    specialization = serializers.StringRelatedField(many=False)
    available_time = serializers.StringRelatedField(many=True)
    class Meta:
        model = Doctor
        fields = '__all__'
    
    def get_full_name(self, obj):
        return f"Dr. {obj.user.first_name} {obj.user.last_name}"