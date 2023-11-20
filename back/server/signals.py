from django.db import models
from django.dispatch import receiver


@receiver(models.signals.pre_delete, sender='server.Category')
def delete_category_icon(sender, instance, **kwargs):
    if instance.icon:
        instance.icon.delete(save=False)


@receiver(models.signals.pre_delete, sender='server.Server')
def delete_category_icon(sender, instance, **kwargs):
    if instance.icon:
        instance.icon.delete(save=False)
    if instance.banner:
        instance.banner.delete(save=False)
