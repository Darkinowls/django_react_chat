from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.generics import get_object_or_404
from rest_framework.request import Request
from rest_framework.response import Response

from .serializers import ServerSerializer

from server.models import Server


# Create your views here.

class ServerViewSet(viewsets.ViewSet):
    model = Server
    queryset = Server.objects.all()

    def retrieve(self, request: Request, pk=None):
        server = get_object_or_404(self.queryset, pk=pk)
        s = ServerSerializer(server)
        return Response(s.data)

    def list(self, request: Request, *args, **kwargs):
        category = request.query_params.get('category')
        qty = request.query_params.get('qty')
        by_user = request.query_params.get('by_user') == 'true'
        server_id = request.query_params.get('server_id')
        queryset = self.queryset

        if by_user or server_id and not request.user.is_authenticated:
            raise AuthenticationFailed("You must be logged in to use this feature")

        if by_user:
            queryset = self.queryset.filter(member=request.user)
            queryset = queryset.distinct()
        if server_id is not None:
            queryset = self.queryset.filter(category__server=server_id)
        if category is not None:
            queryset = self.queryset.filter(category__name__iexact=category)
        try:
            if qty is not None:
                queryset = queryset[:int(qty)]
        except ValueError:
            raise ValidationError("qty must be an integer")

        s = ServerSerializer(queryset, many=True)
        return Response(s.data)
