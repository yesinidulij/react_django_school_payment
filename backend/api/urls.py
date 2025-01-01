from django.urls import path
from . import views

urlpatterns = [
    path("payments/", views.paymentListCreate.as_view(), name="payment-list"),
    path("payment_detail", views.payment_detail, name="payment-detail"),
    path("paid_student", views.paid_student, name="paid-student"),
    path("allpayments/", views.AllPayments.as_view(), name="all-payments"),
    path("users/", views.userListView.as_view(), name="user-list"),
    path("students/", views.studentListView.as_view(), name="student-list"),
    path('current-user/', views.CurrentUserView.as_view(), name='current-user'),
    path("fees/", views.feeListCreate.as_view(), name="fee-list"),
    path('chapa/',views.chapa_webhook)



]