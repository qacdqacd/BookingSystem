import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        recaptcha_response = request.data.get("recaptcha")  # Get reCAPTCHA response from frontend

        # Verify reCAPTCHA with Google's API
        captcha_url = "https://www.google.com/recaptcha/api/siteverify"
        payload = {
            "secret": "6LfU2gkrAAAAAKX7aTQOnD66F0lg4Ato0x8MnFEX",  # Secret Key
            "response": recaptcha_response
        }
        captcha_response = requests.post(captcha_url, data=payload)
        captcha_result = captcha_response.json()

        if not captcha_result.get("success"):
            return Response({"error": "reCAPTCHA verification failed."}, status=status.HTTP_400_BAD_REQUEST)

        # Now, authenticate the user using the provided username and password
        # You can use Django's built-in authentication system to verify the credentials here.

        # If authentication is successful:
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)

        # If authentication fails:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
