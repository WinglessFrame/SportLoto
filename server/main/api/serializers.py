from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework import serializers

class AddToBalanceSerializer(Serializer):
    adding = serializers.IntegerField(min_value=0)