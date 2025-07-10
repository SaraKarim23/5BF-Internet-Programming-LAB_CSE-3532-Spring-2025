from django.shortcuts import render,redirect
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Patient
from .serializers import ChangePasswordSerializer,PatientSerializer, RegistrationSerializer, UserLoginSerializer, PatientEditSerializer
from rest_framework.views import APIView
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.utils.encoding import force_str  
from django.contrib.auth import authenticate,login,logout
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        patient = Patient.objects.get(user=request.user)
        serializer = PatientSerializer(patient)
        return Response(serializer.data)

class UserRegistrationAPIView(APIView):
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(): 
            user = serializer.save()
            Patient.objects.create(user=user)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            confirm_link = f"http://127.0.0.1:8000/patient/active/{uid}/{token}/"
            email_subject = "Confirm Your Email"
            email_body = render_to_string('confirm_email.html',{'confirm_link': confirm_link})
            email = EmailMultiAlternatives(email_subject,'',to=[user.email])
            email.attach_alternative(email_body,"text/html")
            email.send()
            return Response("Check your mail for confirmation")
        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    


def activate_user(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User._default_manager.get(pk=uid)
    except (User.DoesNotExist, ValueError, TypeError, OverflowError):
        user = None

    if user and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return redirect('login')
    else:
        return Response("❌ The verification link is invalid or has expired.")


class UserLoginApiView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)

            if user is not None:
                if not user.is_active:
                    return Response({'error': 'Please activate your account via email before logging in 😇'}, status=403)

                token, _ = Token.objects.get_or_create(user=user)
                login(request, user)
                patient = Patient.objects.filter(user=user).first()
                patient_id = patient.id if patient else None
                return Response({
                    'token': token.key,
                    'user_id': user.id,
                    'patient_id': patient_id
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=400)
        return Response(serializer.errors, status=400)

    

class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return redirect('login')
    

class EditProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        patient = Patient.objects.get(user=request.user)
        serializer = PatientEditSerializer(patient)
        return Response(serializer.data)

    def put(self, request):
        patient = Patient.objects.get(user=request.user)
        serializer = PatientEditSerializer(patient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully!"})
        return Response(serializer.errors, status=400)
    
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            current_password = serializer.validated_data['current_password']
            new_password = serializer.validated_data['new_password']

            if not user.check_password(current_password):
                return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()

            return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)