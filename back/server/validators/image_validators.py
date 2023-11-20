import os

from PIL import Image
from django.core.exceptions import ValidationError

ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.svg']


def validate_icon_size(image):
    with Image.open(image) as img:
        width, height = img.size
        if width > 100 or height > 100:
            raise ValidationError('Icon size must be 100x100 pixels')


def validate_image_file_extension(image):
    ext = os.path.splitext(image.name)[-1].lower()
    if ext not in ALLOWED_IMAGE_EXTENSIONS:
        raise ValidationError('Image file must be jpg, jpeg or png')
