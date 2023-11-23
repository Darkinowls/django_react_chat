import enum
import os

from django.db import models

import uuid


class __Folder(enum.Enum):
    SERVER_ICON = 'server_icon'
    SERVER_BANNER = 'server_banner'
    CATEGORY_ICON = 'category_icon'


def __get_path(folder: __Folder, filename: str):
    return os.path.join(folder.value, uuid.uuid4().__str__(), filename)


def prepare_server_icon_path(_, filename: str):
    return __get_path(__Folder.SERVER_ICON, filename)


def prepare_server_banner_path(_, filename: str):
    return __get_path(__Folder.SERVER_BANNER, filename)


def prepare_category_icon_path(_, filename: str):
    return __get_path(__Folder.CATEGORY_ICON, filename)
