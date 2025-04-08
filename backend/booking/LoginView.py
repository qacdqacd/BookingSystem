# views.py
import requests
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
        recaptcha_response = request.data.get("recaptcha")

        # Verify reCAPTCHA with Google's API
        captcha_url = "https://www.google.com/recaptcha/api/siteverify"
        payload = {
            "secret": "YOUR_SECRET_KEY",  # Replace with your reCAPTCHA secret key
            "response": recaptcha_response
        }
        captcha_response = requests.post(captcha_url, data=payload)
        captcha_result = captcha_response.json()

        if not captcha_result.get("success"):
            return Response({"error": "reCAPTCHA verification failed."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate password
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({"error": e.messages}, status=status.HTTP_400_BAD_REQUEST)

        # Create new user
        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
