from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter() 
router.register(r'list',views.PatientViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('register/',views.UserRegistrationAPIView.as_view(),name='register'),
    path('login/',views.UserLoginApiView.as_view(),name='login'),
    path('logout/',views.UserLogoutView.as_view(),name='logout'),
    path('edit-profile/', views.EditProfileAPIView.as_view(), name='edit-profile'),
    path('profile/', views.PatientProfileAPIView.as_view(), name='patient-profile'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    path('active/<uidb64>/<token>/',views.activate_user,name='activate'),
]