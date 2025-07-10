from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'list',views.DoctorViewSet)
router.register(r'specialization',views.SpecializationViewSet)
router.register(r'available_time',views.AvailableTimeViewSet)
router.register(r'reviews',views.ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]