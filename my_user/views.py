import hashlib

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MyUser
from .serializers import MyUserSerializer


class RegisterView(APIView):
    @staticmethod
    def post(request):
        serializer = MyUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    @staticmethod
    def post(request):
        username = request.data.get('username')
        client_password = request.data.get('password')

        user = MyUser.objects.filter(username=username).first()
        hash_time = user.hash_time
        password_db = user.password

        if user:
            client_password_hashed = hashlib.sha256(client_password.encode('utf-8')).hexdigest()
            if client_password_hashed == password_db:
                user.password = client_password
                user.hash_time = hash_time - 1
                user.save()
                return Response({"message": "Login successful."}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid username or password."}, status=status.HTTP_400_BAD_REQUEST)


class HashTimeView(APIView):
    @staticmethod
    def get(request):
        username = request.query_params.get('username')
        if username:
            user = MyUser.objects.filter(username=username).first()
            if user:
                return Response({'hash_time': user.hash_time}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
