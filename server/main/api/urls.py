from django.urls import path

from main.api.views import AddToBalanceAPIView, UploadProfileImageAPIView, RetrieveUpdateUserInfoAPIView, \
    GameHistoryAPIView, GameAPIView

app_name = 'main'

urlpatterns = [
    path('balance/', AddToBalanceAPIView.as_view(), name='add_to_balance'),
    path('image/', UploadProfileImageAPIView.as_view(), name='profile_image'),
    path('profile/', RetrieveUpdateUserInfoAPIView.as_view(), name='profile_info'),
    path('history/', GameHistoryAPIView.as_view(), name='games_history'),
    path('game/', GameAPIView.as_view(), name='game')
]


