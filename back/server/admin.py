from django.contrib import admin

from server import models

# Register your models here.


admin.site.register(models.Category)
admin.site.register(models.Server)
admin.site.register(models.Channel)
