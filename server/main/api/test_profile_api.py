from django.contrib.auth.models import User
from rest_framework.test import APITestCase

from main.models import Profile


class ProfileAPI(APITestCase):

    def setUp(self) -> None:
        User.objects.create_user('testUser', 'test@mail.com', 'password')

    def test_profile_instance_is_created(self):
        profile_count = Profile.objects.all().count()
        self.assertEqual(profile_count, 1)
