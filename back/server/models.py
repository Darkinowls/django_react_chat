from django.conf import settings
from django.db import models
from django.dispatch import receiver
from rest_framework.generics import get_object_or_404

from server.folder_handler import prepare_category_icon_path, \
    prepare_server_icon_path, prepare_server_banner_path
from server.validators.image_validators import validate_icon_size, validate_image_file_extension


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(upload_to=prepare_category_icon_path, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Server(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                              related_name='server_owner')
    description = models.TextField(blank=True, null=True)
    member = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='server_member')
    icon = models.FileField(upload_to=prepare_server_icon_path, blank=True, null=True,
                            validators=[validate_icon_size, validate_image_file_extension])
    banner = models.FileField(upload_to=prepare_server_banner_path, blank=True, null=True,
                              validators=[validate_image_file_extension])

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Channel(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='channel_server')
    topic = models.CharField(max_length=100)

    def __str__(self):
        return self.name
