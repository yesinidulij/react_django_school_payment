from django.urls import path
from . import views

urlpatterns = [
    path("payments/", views.paymentListCreate.as_view(), name="payment-list"),
    path("students/", views.studentListView.as_view(), name="payment-list"),
     path('current-user/', views.CurrentUserView.as_view(), name='current-user'),

]