import enum
import os

from django.db import models


class __Folder(enum.Enum):
    CHANNEL_ICON = 'channel_icon'
    CHANNEL_BANNER = 'channel_banner'
    CATEGORY_ICON = 'category_icon'


def __get_path(folder: __Folder, instance: models.Model, filename: str):
    return os.path.join(folder.name, str(instance.id), filename)


def prepare_channel_icon_path(instance: models.Model, filename: str):
    return __get_path(__Folder.CHANNEL_ICON, instance, filename)


def prepare_channel_banner_path(instance: models.Model, filename: str):
    return __get_path(__Folder.CHANNEL_BANNER, instance, filename)


def prepare_category_icon_path(instance: models.Model, filename: str):
    return __get_path(__Folder.CATEGORY_ICON, instance, filename)
