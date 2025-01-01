from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView,createSystemUser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers 

# route = routers.DefaultRouter()
# route.register("users/me/", UserViewSet, basename="userview")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/systemuser/register/", createSystemUser.as_view(), name="systemregister"),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),  
    path("api/", include("api.urls")),

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)