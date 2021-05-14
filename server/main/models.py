from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


def upload_profile_image(instance, filename):
    return f"profiles/{instance.user}/{filename}"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', blank=False)
    profileImage = models.ImageField(upload_to=upload_profile_image, blank=True)
    balance = models.IntegerField(default=0, blank=False, null=False)

    def __str__(self):
        return f'profile {self.user.username}'

    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
