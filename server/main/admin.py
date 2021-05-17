from django.contrib import admin

from main.models import Profile, Game


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('pk', 'balance', 'user', 'profile_image')


class GameAdmin(admin.ModelAdmin):
    list_display = ('pk', 'user', 'bet', 'win_sequence', 'bet_price', 'date', 'time', 'result', 'matches')


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Game, GameAdmin)
