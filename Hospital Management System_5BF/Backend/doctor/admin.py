from django.contrib import admin
from . import models
# Register your models here.
class SpecializationAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug':('name',),}
admin.site.register(models.Specialization,SpecializationAdmin)
admin.site.register(models.AvailableTime)
admin.site.register(models.Doctor)
admin.site.register(models.Review)