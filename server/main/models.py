from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


def upload_profile_image(instance, filename):
    return f"images/profiles/{instance.user}/{filename}"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', blank=False)
    profile_image = models.ImageField(upload_to=upload_profile_image, blank=True)
    balance = models.PositiveIntegerField(default=0, blank=False, null=False)

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


class Game(models.Model):
    user = models.ForeignKey(User, null=True, blank=False, verbose_name='games', on_delete=models.SET_NULL)
    bet_price = models.PositiveIntegerField(null=False, blank=False, default=1)
    bet = models.CharField(null=False, blank=False, max_length=100)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    result = models.BooleanField(null=False, blank=False)
    matches = models.PositiveIntegerField()

    def __str__(self):
        return f'game {self.pk} {self.user.username}'

    class Meta:
        verbose_name = 'Game'
        verbose_name_plural = 'Games'