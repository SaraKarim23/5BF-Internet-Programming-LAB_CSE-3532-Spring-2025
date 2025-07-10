from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter() 
router.register(r'services',views.ServiceViewSet)
router.register(r'service-booking',views.ServiceBookingViewSet)
urlpatterns = [
    path('', include(router.urls)),
]