from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics
from .serializers import UserSerializer, SystemUserSerializer,paymentSerializer,StudentSerializer,FeeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import SystemUser,payment,Student,Fee
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.apps import apps
import json
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotFound
from rest_framework import status
User = get_user_model()

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class paymentListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = paymentSerializer

    def get_queryset(self):
        user = self.request.user
        return payment.objects.filter(student=user)
    

class AllPayments(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = paymentSerializer

    def get_queryset(self):
        return payment.objects.all()

class createSystemUser(generics.CreateAPIView):
    queryset = SystemUser.objects.all()
    serializer_class = SystemUserSerializer
    permission_classes = [AllowAny]

class studentListView(generics.ListCreateAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        user = self.request.user
        return Student.objects.all()

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class userListView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return User.objects.all()

   

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user_data = {
            'id':request.user.id,
            'email': request.user.email,
            'first_name':request.user.first_name,
            "last_name":request.user.last_name,
            
        }
        return Response(user_data)

class feeListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        fees = Fee.objects.all()  # Query all fees
        serializer = FeeSerializer(fees, many=True)  # Serialize the queryset
        return Response(serializer.data)
    
from rest_framework.exceptions import NotFound

@api_view(["GET"])
def payment_detail(request):
    feeid=request.query_params.get("feeid")
    fee=Fee.objects.get(id=feeid)
    paymentvalue = payment.objects.filter(student=request.user, fee=fee).exists()
    return Response({'paymentvalue':paymentvalue})
    
@api_view(["GET"])
def paid_student(request):
    feeid=request.query_params.get("feeid")
    fee=Fee.objects.get(id=feeid)
    paymentvalue = payment.objects.filter(fee=fee,student=request.user)
    serialzer=paymentSerializer(paymentvalue,many=True)
    return Response(serialzer.data)




from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.apps import apps
import json
import requests
from django.utils import timezone
from django.core.mail import send_mail


@csrf_exempt
def chapa_webhook(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            # Process the POST request data
            return JsonResponse({'message': 'POST request received'})
        except json.decoder.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON Body'}, status=400)
    elif request.method == 'GET':
        # Handle GET request parameters
        trx_ref = request.GET.get('trx_ref')
        status = request.GET.get('status')
        
        url = "https://api.chapa.co/v1/transaction/verify/"
        url=url+trx_ref

        payload = {}
        headers = {
          'Authorization': 'Bearer CHASECK_TEST-Dr5m3aqJxu4Tlr7X756jzTXgJoUyrXFb'
                   }

        response = requests.get(url, headers=headers, data=payload)
        context = {}
        if response.status_code == 200:
        # Access the response data (assuming it's JSON)
         response_data = response.json()
         amount= response_data["data"]["amount"]
         feeid=response_data["data"]["customization"]["title"]
         currency=response_data["data"]["currency"]
         reference=response_data["data"]["reference"]
         email=response_data["data"]["email"]
         user=User.objects.get(email=email)
         fee=Fee.objects.get(id=feeid)
         payment.objects.create(fee=fee,student=user,amount=amount,currency=currency,reference=reference) 
        
        subject = "your payment is successfull"
        message ="congratulations you are successfully paid your school fee"

        if email and subject and message:
            try:
                send_mail(subject, message, settings.EMAIL_HOST_USER, [email])
                context['result'] = 'Email sent successfully'
            except Exception as e:
                context['result'] = f'Error sending email: {e}'
        else:
            context['result'] = "All fields are required"
        # Log or process the GET request parameters
        return JsonResponse({'message': 'GET request received'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


