# Create your views here.
from rest_framework import mixins, status
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework.views import APIView

from account.models import Account
from account.schemas import account_list
from account.serializers import AccountSerializer, CustomTokenObtainPairSerializer, CustomRefreshTokenSerializer, \
    RegisterSerializer
from rest_framework_simplejwt import views
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from back import settings


class RegisterApiView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = RegisterSerializer
    queryset = Account.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)
    # def pe


class LogoutApiView(APIView):

    def post(self, request, *args, **kwargs):
        rt = request.COOKIES.get('refresh', None)
        if rt is None:
            return Response({"detail": "Refresh token not found"}, status=400)
        response = Response()
        response.delete_cookie('refresh')
        response.delete_cookie('access')
        return response


class AccountViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @account_list
    def list(self, request: Request, *args, **kwargs):
        user_id = request.query_params.get('user_id')
        queryset = Account.objects.get(id=user_id)
        serializer = AccountSerializer(queryset)
        return Response(serializer.data)


class JWTCookieMixin(APIView):
    def finalize_response(self, request: Request, response: Response, *args, **kwargs):
        if response.data.get('access'):
            response.set_cookie('access',
                                response.data['access'],
                                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                                httponly=True,
                                samesite='Strict')
            del response.data['access']

        if response.data.get('refresh'):
            response.set_cookie('refresh',
                                response.data['refresh'],
                                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                                httponly=True,
                                samesite='Strict')
            del response.data['refresh']

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenPairView(JWTCookieMixin, views.TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class JWTCookieRefreshView(JWTCookieMixin, views.TokenRefreshView):
    serializer_class = CustomRefreshTokenSerializer
