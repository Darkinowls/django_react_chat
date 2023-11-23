from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from server import models


# Register your models here.

class ServerAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'owner', 'description']


admin.site.register(models.Category)
admin.site.register(models.Server, ServerAdmin)
admin.site.register(models.Channel)
admin.site.register(get_user_model(), UserAdmin)
