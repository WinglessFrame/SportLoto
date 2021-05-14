from django.contrib.auth.models import User
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from main.models import Profile


class ProfileAPI(APITestCase):

    def setUp(self) -> None:
        User.objects.create_user('testUser', 'test@mail.com', 'password')

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
        # check balance
        self.assertEqual(response.data.get('balance'), ADDING_VALUE)

