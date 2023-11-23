from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.reverse import reverse
from rest_framework.test import APIClient

from server.models import Server, Category
from PIL import Image

import tempfile

SERVER_URL = reverse('server-list')


def create_image():
    size = (50, 50)
    color = (255, 0, 0, 0)
    with tempfile.NamedTemporaryFile(suffix='.png', delete=False,
                                     dir="D:/PythonJob/DjangoReactChat/back/media") as f:
        image = Image.new("RGBA", size, color)
        image.save(f, 'png')
    return f.name


class ServerTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name="test")
        self.user = get_user_model().objects.create_user(
            username="test",
            email="test@exmaple.com",
            password="test12sd3124"
        )

    def test_server(self):
        response = self.client.get(SERVER_URL)
        self.assertEqual(response.status_code, 200)

    def test_create_admin(self):
        s = Server.objects.create(
            name="test",
            category_id=self.category.id,
            owner=self.user,
            icon=create_image(),
            banner=create_image()
        )
        s.delete()
