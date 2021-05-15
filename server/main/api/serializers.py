from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer

from main.models import Profile


class AddToBalanceSerializer(Serializer):
    adding = serializers.IntegerField(min_value=0)


class UploadProfileImageSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ('profile_image',)
