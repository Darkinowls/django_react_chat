from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.generics import get_object_or_404
from rest_framework.request import Request
from rest_framework.response import Response

from .serializers import ServerSerializer

from server.models import Server


# Create your views here.

class ServerViewSet(viewsets.ViewSet):
    # Set the model and initial queryset for the ServerViewSet
    model = Server
    queryset = Server.objects.all()

    def retrieve(self, request: Request, pk=None):
        # Retrieve a single server instance by primary key
        server = get_object_or_404(self.queryset, pk=pk)
        s = ServerSerializer(server)
        return Response(s.data)

    def list(self, request: Request, *args, **kwargs):
        # Extract query parameters from the request
        category = request.query_params.get('category')
        qty = request.query_params.get('qty')
        by_user = request.query_params.get('by_user') == 'true'
        server_id = request.query_params.get('server_id')
        with_num_members = request.query_params.get('with_num_members') == 'true'
        queryset = self.queryset

        # Check authentication for certain query parameters
        if by_user or server_id and not request.user.is_authenticated:
            raise AuthenticationFailed("You must be logged in to use this feature")

        # Annotate queryset with the number of members if requested
        if with_num_members:
            queryset = queryset.annotate(num_members=Count('member'))

        # Filter queryset based on query parameters
        if by_user:
            queryset = self.queryset.filter(member=request.user)
            queryset = queryset.distinct()
        if server_id is not None:
            queryset = self.queryset.filter(category__server=server_id)
        if category is not None:
            queryset = self.queryset.filter(category__name__iexact=category)

        try:
            # Limit queryset based on the specified quantity if provided
            if qty is not None:
                queryset = queryset[:int(qty)]
        except ValueError:
            raise ValidationError("qty must be an integer")

        # Serialize the queryset and return the response
        s = ServerSerializer(queryset, many=True)
        return Response(s.data)
