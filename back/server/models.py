from django.conf import settings
from django.db import models

from account.models import Account


# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

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
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    topic = models.CharField(max_length=100)

    def save(
            self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.name = self.name.lower()
        super().save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return self.name