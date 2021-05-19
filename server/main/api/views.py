import random

from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.generics import UpdateAPIView, RetrieveUpdateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from main.api.serializers import AddToBalanceSerializer, UploadProfileImageSerializer, UpdateUserInfoSerializer, \
    GameHistorySerializer, GameSerializer
from main.models import Game


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
            return Response(data={"balance": profile.balance}, status=status.HTTP_200_OK)
        else:
            return Response(data={"message": "No 'adding' field in request"}, status=status.HTTP_400_BAD_REQUEST)


class UploadProfileImageAPIView(UpdateAPIView):
    authentication_classes = (JWTAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated,)
    serializer_class = UploadProfileImageSerializer

    def get_object(self):
        return self.request.user.profile


class RetrieveUpdateUserInfoAPIView(RetrieveUpdateAPIView):
    authentication_classes = (JWTAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserInfoSerializer

    def get_object(self):
        return self.request.user


class GameHistoryAPIView(ListAPIView):
    authentication_classes = (JWTAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated,)
    serializer_class = GameHistorySerializer

    def get_queryset(self):
        return self.request.user.profile.games


def calculate_equals_count(list1, list2):
    count = 0
    for el in list1:
        if int(el) in list2:
            count += 1
    return count


class GameAPIView(APIView):
    authentication_classes = (JWTAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated,)
    serializer_class = GameSerializer

    def post(self, request, *args, **kwargs):
        bet = request.data.get('bet', None)
        bet_price = request.data.get('bet_price', None)

        if not bet or not bet_price:
            return Response(
                data={'message': 'There is no "bet" or "bet_price" field in request'},
                status=status.HTTP_400_BAD_REQUEST
            )
        bet_price = int(bet_price)
        win_sequence = random.sample(range(1, 37), 5)
        user_profile = request.user.profile

        input_sequence = list(map(lambda x: int(x), bet.split(' ')))
        count = calculate_equals_count(input_sequence, win_sequence)
        result = (count >= 1)

        win_sequence = list(map(lambda x: str(x), win_sequence))
        profile = request.user.profile

        if result:
            win_value = count ** (count - 1) * bet_price
            profile.balance += win_value
        else:
            win_value = 0
            profile.balance -= bet_price
        profile.save()


        obj = Game.objects.create(
            user_profile=user_profile,
            bet_price=bet_price,
            bet=bet,
            win_sequence=" ".join(win_sequence),
            result=result,
            matches=count,
            win_value=win_value
        )

        return Response(
            data={
                'pk': obj.pk,
                'price': obj.bet_price,
                'time': obj.time,
                'date': obj.date,
                'result': result,
                'matchesCount': obj.matches,
                'winValue': win_value,
                'balance': obj.user_profile.balance
            },
            status=status.HTTP_201_CREATED
        )
