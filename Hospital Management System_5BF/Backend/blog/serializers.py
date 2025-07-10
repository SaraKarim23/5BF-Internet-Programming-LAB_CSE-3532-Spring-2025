from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    doctor = serializers.StringRelatedField(many=False)

    class Meta:
        model = Blog
        fields = '__all__'
