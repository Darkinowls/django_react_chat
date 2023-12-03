from typing import Optional, Tuple

from rest_framework.request import HttpRequest
from rest_framework_simplejwt.authentication import JWTAuthentication, AuthUser
from rest_framework_simplejwt.tokens import Token


class JWTCookieAuth(JWTAuthentication):
    def authenticate(self, request: HttpRequest) -> Optional[Tuple[AuthUser, Token]]:
        access_token = request.COOKIES.get('access', None)
        if access_token is None:
            return None
        validated_token = self.get_validated_token(access_token)
        return self.get_user(validated_token), validated_token
