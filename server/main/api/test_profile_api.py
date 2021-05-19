import io

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

    def test_profile_data_enpoint(self):
        url = reverse('main:profile_info')
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)
        # get
        get_response = self.client.get(url)
        self.assertEqual(get_response.data['email'], 'test@mail.com')
        # patch
        NEW_NAME = 'Bob'
        patch_response = self.client.patch(url, data={'first_name': NEW_NAME}, format='json')
        self.assertEqual(User.objects.get(pk=1).first_name, NEW_NAME)

    def test_game_endpoint(self):
        url = reverse('main:game')
        response = self.client.post(url)
        # auth required
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        #
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)
        # bad request
        response = self.client.post(url, data={'bet_price': 5})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response = self.client.post(url, data={'bet': '3 2 1 5 3'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response = self.client.post(url, data={'something': 'bad'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # good request
        response = self.client.post(url, data={'bet': '1 3 5 7 9', 'bet_price': '5'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_history_endpoint(self):
        url = reverse('main:games_history')
        # if not authorized -> 403
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        # if authorized -> 200 + data
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Empty list
        self.assertEqual(bool(response.data), False)
