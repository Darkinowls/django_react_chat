import enum
import os

from django.conf import settings
from django.db import models
from django.dispatch import receiver
from rest_framework.generics import get_object_or_404

from server.folder_handler import get_image_path, Folder
from server.validators.image_validators import validate_icon_size, validate_image_file_extension


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(upload_to=get_image_path(Folder.CATEGORY_ICON), blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.id:
            old_category: Category = get_object_or_404(Category, id=self.id)
            if old_category.icon != self.icon:
                old_category.icon.delete(save=False)
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

    def __str__(self):
        return self.name


class Channel(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='channel_server')
    topic = models.CharField(max_length=100)
    banner = models.ImageField(upload_to=get_image_path(Folder.CHANNEL_BANNER),
                               blank=True,
                               null=True,
                               validators=[validate_image_file_extension])
    icon = models.ImageField(upload_to=get_image_path(Folder.CHANNEL_ICON),
                             blank=True,
                             null=True,
                             validators=[validate_icon_size, validate_image_file_extension])

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        if self.id is None:
            return

        old_category: Channel = get_object_or_404(Channel, id=self.id)
        if old_category.icon != self.icon:
            old_category.icon.delete(save=False)
        if old_category.banner != self.icon:
            old_category.banner.delete(save=False)
            super().save(*args, **kwargs)

    def __str__(self):
        return self.name
