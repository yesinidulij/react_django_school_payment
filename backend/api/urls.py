from django.urls import path
from . import views

urlpatterns = [
    path("payments/", views.paymentListCreate.as_view(), name="payment-list"),
]