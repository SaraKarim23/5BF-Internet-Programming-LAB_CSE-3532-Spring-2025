from django.contrib import admin
from django.urls import path, re_path  # Use path and re_path instead of url
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin route
    path('', views.index, name='index'),  # Home page route
    path('home', views.home, name='home'),  # Home page route (alternative)
    path('addnew', views.addnew, name='addnew'),  # Add new entry
    re_path(r'^edit/(?P<id>\d+)$', views.edit, name='edit'),  # Edit entry with ID
    re_path(r'^update/(?P<id>\d+)$', views.update, name='update'),  # Update entry with ID
    re_path(r'^delete/(?P<id>\d+)$', views.destroy, name='destroy'),  # Delete entry with ID
]