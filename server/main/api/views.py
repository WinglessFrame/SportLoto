from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from main.api.serializers import AddToBalanceSerializer, UploadProfileImageSerializer


class AddToBalanceAPIView(APIView):
    authentication_classes = (JWTAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = AddToBalanceSerializer(data=request.data)
        if serializer.is_valid():
            serialized_data = serializer.validated_data
            profile = request.user.profile
            add = serialized_data['adding']
            profile.balance += add
            profile.save()
            return Response(data={"balance": profile.balance}, status=200)
        else:
            return Response(data={"message": "No 'adding' field in request"}, status=400)


class UploadProfileImageAPIView(UpdateAPIView):
    authentication_classes = (JWTAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated,)
    serializer_class = UploadProfileImageSerializer

    def get_object(self):
        return self.request.user.profile
