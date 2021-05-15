from django.urls import path

from main.api.views import AddToBalanceAPIView, UploadProfileImageAPIView

app_name = 'main'

urlpatterns = [
    path('balance/', AddToBalanceAPIView.as_view(), name='add_to_balance'),
    path('image/', UploadProfileImageAPIView.as_view(), name='profile_image')
]


