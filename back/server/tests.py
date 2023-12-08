from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
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
        self.client.force_authenticate(user=self.user)
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


class ServerMembershipViewSetTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='testuser', password='testpassword')
        cat = Category.objects.create(name='Test Category')
        self.server = Server.objects.create(name='Test Server', category=cat, owner=self.user)
        self.server.save()


    def test_create_membership_success(self):
        client = APIClient()
        client.force_authenticate(user=self.user)

        response = client.post(f'/api/membership/{self.server.id}/membership/')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, {'success': 'You have joined this server.'})
        self.assertTrue(self.server.member.filter(pk=self.user.pk).exists())

    def test_create_membership_duplicate(self):
        client = APIClient()
        client.force_authenticate(user=self.user)

        # Add the user to the server initially
        self.server.member.add(self.user)

        response = client.post(f'/api/membership/{self.server.id}/membership/')
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(response.data, {'error': 'You are already a member of this server.'})

    def test_create_membership_unauthenticated(self):
        client = APIClient()

        response = client.post(f'/api/membership/{self.server.id}/membership/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_is_member(self):
    #     client = APIClient()
    #     client.force_authenticate(user=self.user)
    #
    #     # Add the user to the server initially
    #     self.server.member.add(self.user)
    #
    #     response = client.get(f'/api/membership/{self.server.id}/membership/')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data, {'is_member': True})
    #
    # def test_remove_member(self):
    #     client = APIClient()
    #     client.force_authenticate(user=self.user)
    #
    #     print(self.server.id)
    #     # Add the user to the server initially
    #     self.server.member.add(self.user)
    #
    #     response = client.delete(f'/api/membership/{self.server.id}/membership/')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data, {'success': 'User removed'})
    #     self.assertFalse(self.server.member.filter(pk=self.user.pk).exists())
