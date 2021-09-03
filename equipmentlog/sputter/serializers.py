from rest_framework import serializers
from .models import Deposition_RF

class DepositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deposition_RF
        fields = '__all__'