from django.urls import path

from main.api.views import AddToBalanceAPIView

app_name = 'main'

urlpatterns = [
    # path('register/', RegisterAPIView.as_view(), name='register'),
    # path('token/', CustomTokenObtainPairView.as_view(), name='login'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('balance/', AddToBalanceAPIView.as_view(), name='add_to_balance')
]


