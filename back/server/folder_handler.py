import enum
import os

from django.db import models


class Folder(enum.Enum):
    CHANNEL_ICON = 'channel_icon'
    CHANNEL_BANNER = 'channel_banner'
    CATEGORY_ICON = 'category_icon'


def get_image_path(folder: Folder):
    def prepare_path(instance: models.Model, filename: str):
        return os.path.join(folder.name, str(instance.id), filename)

    return prepare_path
