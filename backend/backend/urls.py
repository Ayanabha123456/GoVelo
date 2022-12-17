"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from eVehicle import views
from django.urls import re_path as url
from rest_framework_simplejwt import views as jwt_views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, 'eVehicle')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('hello/', views.TestView.as_view(), name='hello'),
    path('token/', views.CustomTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/', jwt_views.TokenObtainPairView.as_view()),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    path('register/', views.UserView.register, name='register'),
    path('delete/', views.UserView.delete_user, name='delete'),
    path('changePassword/', views.UserView.change_password, name='changePassword'),
    path('verifyPassword/', views.UserView.verify_password, name='verifyPassword'),
    path('api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify'),
    path('book/', views.BookViewSet.as_view(), name='book'),
    path('vehicles/',
         views.VehicleView.as_view(), name='vehicles'),
    path('trip/', views.TripSet.as_view(), name='trip'),
    path('vehicle/<int:pk>',
         views.VehicleViewSet.as_view(), name='vehicle'),
    path('user/<int:pk>',
         views.UserView.as_view(), name='user'),
    path('wallet/<int:pk>',
         views.WalletView.as_view(), name='wallet'),
    path('bank/<int:pk>',
         views.BankView.as_view(), name='bank'),
    path('walletactivity/<int:pk>',
         views.WalletActivityView.as_view(), name='walletactivity'),
    path('walletactivity/',
         views.WalletActivityView.as_view(), name='walletactivity'),
    path('trips/<int:pk>',
         views.TripViewSet.as_view(), name='trip'),
    path('trips/',
         views.TripsViewSet.as_view(), name='trips'),
    path('graphs/',
         views.GraphViewSet.as_view(), name='graphs')


]
