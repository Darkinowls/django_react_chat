import os

from django.conf import settings
from django.db import models
from django.dispatch import receiver
from rest_framework.generics import get_object_or_404

from server.validators.image_validators import validate_icon_size, validate_image_file_extension


# Create your models here.
def get_server_icon_path(instance: 'Server', filename):
    return os.path.join('server_icon', str(instance.id), filename)


def get_server_banner_path(instance: 'Server', filename):
    return os.path.join('server_banner', str(instance.id), filename)


def get_category_icon_path(instance: 'Category', filename):
    return os.path.join('category_icon', str(instance.id), filename)


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(upload_to=get_category_icon_path, blank=True, null=True,
                            validators=[validate_icon_size, validate_image_file_extension])

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
    banner = models.ImageField(upload_to=get_server_banner_path, blank=True, null=True,
                               validators=[validate_image_file_extension]
                               )
    icon = models.ImageField(upload_to=get_server_icon_path, blank=True, null=True,
                             validators=[validate_icon_size, validate_image_file_extension])

    def save(self, *args, **kwargs):
        if self.id:
            old_category: Server = get_object_or_404(Server, id=self.id)
            if old_category.icon != self.icon:
                old_category.icon.delete(save=False)
            if old_category.banner != self.icon:
                old_category.banner.delete(save=False)
                super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Channel(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='channel_server')
    topic = models.CharField(max_length=100)

    def save(
            self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.name = self.name.lower()
        super().save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return self.name
