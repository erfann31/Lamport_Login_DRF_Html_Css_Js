from rest_framework import serializers
from .models import MyUser
import hashlib


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['username', 'password', 'hash_time']

    def create(self, validated_data):
        password = validated_data['password']
        hash_time = validated_data['hash_time']

        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        for _ in range(hash_time):
            hashed_password = hashlib.sha256(hashed_password.encode('utf-8')).hexdigest()

        user = MyUser.objects.create(
            username=validated_data['username'],
            password=hashed_password,
            hash_time=hash_time
        )
        return user
