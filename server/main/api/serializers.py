from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer

from main.models import Profile


class AddToBalanceSerializer(Serializer):
    adding = serializers.IntegerField(min_value=0)


class UploadProfileImageSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ('profile_image',)


class UpdateUserInfoSerializer(ModelSerializer):
    balance = serializers.SerializerMethodField()

    def get_balance(self, obj):
        return obj.profile.balance

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'date_joined', 'balance')


