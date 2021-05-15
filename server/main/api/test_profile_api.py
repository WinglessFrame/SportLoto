import io

import requests
from PIL import Image
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from main.models import Profile


class ProfileAPI(APITestCase):

    def setUp(self) -> None:
        User.objects.create_user('testUser', 'test@mail.com', 'password')
        token_url = reverse('accounts:login')
        response = self.client.post(token_url, data={'username': 'testUser', 'password': 'password'}, format='json')
        self.token = response.data['token']

    def test_profile_instance_is_created(self):
        profile_count = Profile.objects.all().count()
        self.assertEqual(profile_count, 1)

    def test_add_to_balance_endpont(self):
        # check default value
        user = User.objects.get(username='testUser')
        self.assertEqual(user.profile.balance, 0)
        # add to balance through api
        url_add = reverse('main:add_to_balance')
        ADDING_VALUE = 25
        adding_data = {"adding": ADDING_VALUE}
        self.client.force_login(user=user)
        response = self.client.post(url_add, adding_data, format='json')
        # check response
        self.assertEqual(response.data.get('balance'), ADDING_VALUE)
        # check balance
        self.assertEqual(Profile.objects.get(pk=1).balance, ADDING_VALUE)

    def generate_photo_file(self):
        file = io.BytesIO()
        image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
        image.save(file, 'png')
        file.name = 'test.png'
        file.seek(0)
        return file

    def test_upload_profile_image(self):
        upload_image_url = reverse('main:profile_image')
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)

        photo_file = self.generate_photo_file()

        data = {
            'photo': photo_file
        }

        response = self.client.patch(upload_image_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
