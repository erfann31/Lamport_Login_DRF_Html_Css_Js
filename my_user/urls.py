from django.urls import path
from .views import RegisterView, LoginView, HashTimeView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('hash_time/', HashTimeView.as_view(), name='hash_time'),
]
