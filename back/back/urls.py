"""
URL configuration for back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from account.views import AccountViewSet, JWTCookieTokenPairView, JWTCookieRefreshView, LogoutApiView, RegisterApiView
from server.views import ServerViewSet, CategoryViewSet, MessageViewSet
from webchat.consumer import WebChatConsumer

router = DefaultRouter()
router.register('server', ServerViewSet)
router.register('category', CategoryViewSet)
router.register('messages', MessageViewSet)
router.register('account', AccountViewSet, basename='account')
router.register('register', RegisterApiView, basename='account')

urlpatterns = [
                  path('', RedirectView.as_view(url='api/ui')),
                  path('admin/', admin.site.urls),
                  path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
                  path('api/ui/', SpectacularSwaggerView.as_view()),
                  path('api/', include(router.urls)),
                  path('api/token/', JWTCookieTokenPairView.as_view()),
                  path('api/token/refresh/', JWTCookieRefreshView.as_view()),
                  path('api/logout/', LogoutApiView.as_view()),
              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

websocket_urlpatterns = [
    path('ws/<int:serverId>/<int:channelId>', WebChatConsumer.as_asgi()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
