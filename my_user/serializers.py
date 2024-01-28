from rest_framework import serializers
from .models import MyUser
import hashlib


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['username', 'password', 'hash_time']