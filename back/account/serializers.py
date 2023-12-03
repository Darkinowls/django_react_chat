from typing import Dict, Any

from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer

from account.models import Account


class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ['username']


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data: Dict[str, Any]) -> Account:
        user = Account.objects.create_user(**validated_data)
        return user

    def is_valid(self, *, raise_exception=False):
        valid = super().is_valid()
        if not valid:
            return False

        username = self.validated_data.get('username')
        if Account.objects.filter(username=username).exists():
            self.error_messages['username'] = 'Cannot create this user'
            return False

        return True


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs: Dict[str, Any]) -> Dict[Any, Any]:
        data = super().validate(attrs)
        data['user_id'] = self.user.id
        return data


class CustomRefreshTokenSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs: Dict[str, Any]) -> Dict[Any, Any]:
        try:
            attrs['refresh'] = self.context['request'].COOKIES['refresh']
        except KeyError:
            raise InvalidToken('No valid token found in cookie \'refresh\'')
        return super().validate(attrs)
