from django.db import models
from django.dispatch import receiver
from django.shortcuts import get_object_or_404


@receiver(models.signals.pre_save, sender='server.Category')
def delete_category_icon_pre_save(sender, instance: models.Model, **kwargs):
    if instance.id is None:
        return
    old = get_object_or_404(sender, id=instance.id)
    if old.icon != instance.icon:
        old.icon.delete(save=False)
    if instance.icon:
        old.icon.delete(save=False)


@receiver(models.signals.pre_delete, sender='server.Category')
def delete_category_icon_pre_delete(sender, instance: models.Model, **kwargs):
    if instance.icon:
        instance.icon.delete(save=False)


@receiver(models.signals.pre_save, sender='server.Server')
def delete_server_icon_pre_save(sender, instance: models.Model, **kwargs):
    if instance.id is None:
        return
    old = get_object_or_404(sender, id=instance.id)
    if old.icon != instance.icon:
        old.icon.delete(save=False)
    if old.banner != instance.banner:
        old.banner.delete(save=False)


@receiver(models.signals.pre_delete, sender='server.Server')
def delete_server_icon_pre_delete(sender, instance: models.Model, **kwargs):
    if instance.icon:
        instance.icon.delete(save=False)
    if instance.banner:
        instance.banner.delete(save=False)
