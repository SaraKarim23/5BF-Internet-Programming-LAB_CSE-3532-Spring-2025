from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet

router = DefaultRouter()
router.register(r'', BlogViewSet)  # if your main URL is already 'blog/', this is perfect

urlpatterns = [
    path('', include(router.urls)),
]
