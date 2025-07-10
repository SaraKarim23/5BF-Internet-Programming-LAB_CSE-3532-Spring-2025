from django.contrib import admin
from .models import Blog

class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'doctor', 'created_at', 'is_published')
    prepopulated_fields = {'slug': ('title',)}

admin.site.register(Blog, BlogAdmin)
