from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
import jwt

from back import settings


async def get_user_by_token(access: str):
    if not access:
        return AnonymousUser()
    try:
        user_id = jwt.decode(access,
                             settings.SECRET_KEY,
                             algorithms=["HS256"],
                             verify=True)['user_id']
        return await get_user_model().objects.aget(id=user_id)
    except (get_user_model().DoesNotExist, jwt.exceptions.DecodeError):
        return AnonymousUser()


class JWTAuthMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        headers = dict(scope['headers'])
        cookie_str = headers.get(b'cookie', b'').decode()
        cookie_dict = {cookie.split('=')[0]: cookie.split('=')[1] for cookie in cookie_str.split('; ')}
        access = cookie_dict.get('access', None)
        scope['access'] = access
        scope['user'] = await get_user_by_token(access)
        print(scope['user'])
        return await self.app(scope, receive, send)
