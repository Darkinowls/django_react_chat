from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from server.models import Server, Category
from webchat.models import Message, Conversation
from .schema import server_list_docs, message_list_docs
from .serializers import ServerSerializer, CategorySerializer, MessageSerializer


class ServerMembershipViewSet(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]

    def create(self, request, server_id):
        server = get_object_or_404(Server, id=int(server_id))
        user = request.user
        if server.member.filter(pk=user.pk).exists():
            return Response({'error': 'You are already a member of this server.'}, status=status.HTTP_409_CONFLICT)
        server.member.add(user)
        return Response({'success': 'You have joined this server.'}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['DELETE'])
    def remove_member(self, request, server_id):
        server = get_object_or_404(Server, pk=server_id)
        user = request.user
        if not server.member.filter(pk=user.pk).exists():
            return Response({'error': 'Not a member'}, status=status.HTTP_409_CONFLICT)
        if server.owner == user:
            return Response({'error': 'Cannot remove owner'}, status=status.HTTP_400_BAD_REQUEST)
        server.member.remove(user)
        return Response({'success': 'User removed'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def is_member(self, request, server_id):
        server = get_object_or_404(Server, pk=server_id)
        user = request.user
        is_member = server.member.filter(pk=user.pk).exists()
        return Response({'is_member': is_member}, status=status.HTTP_200_OK)


class CategoryViewSet(viewsets.ViewSet):
    queryset = Category.objects.all()
    model = Category
    permission_classes = [IsAuthenticated]

    def list(self, _):
        serializer = CategorySerializer(self.queryset, many=True)
        return Response(serializer.data)


class ServerViewSet(viewsets.ViewSet):
    """
    A viewset for interacting with Server objects.

    Attributes:
        model (type): The Django model class for Server objects.
        queryset (QuerySet): The initial queryset for retrieving Server objects.
    """
    permission_classes = [IsAuthenticated]
    model = Server
    queryset = Server.objects.all()

    # permission_classes = [IsAuthenticated]

    def retrieve(self, request: Request, pk=None):
        """
        Retrieve a server by its primary key.

        Args:
            request (Request): The HTTP request object.
            pk (int): The primary key of the server to retrieve.

        Returns:
            Response: The serialized server data in the HTTP response.

        Raises:
            Http404: If the server with the given primary key does not exist.
        """
        server = get_object_or_404(self.queryset, pk=pk)
        s = ServerSerializer(server)
        return Response([s.data])

    @server_list_docs
    def list(self, request: Request, *args, **kwargs):
        """
        List servers based on specified parameters.

        Args:
            request (Request): The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: Serialized server data in the HTTP response.

        Raises:
            AuthenticationFailed: If user authentication is required and not provided.
            ValidationError: If there's an issue with the provided query parameters.

        Example:
            To list servers with specific parameters, include them in the query parameters:

            - List all servers:
              /api/servers/

            - Filter by category:
              /api/servers/?category=example_category

            - Filter by quantity:
              /api/servers/?qty=5

            - Filter by user membership:
              /api/servers/?by_user=true

            - Filter by server ID:
              /api/servers/?server_id=1

            - Include the number of members:
              /api/servers/?with_num_members=true
        """
        category = request.query_params.get('category')
        qty = request.query_params.get('qty')
        by_user = request.query_params.get('by_user') == 'true'
        server_id = request.query_params.get('server_id')
        with_num_members = request.query_params.get('with_num_members') == 'true'

        queryset = self.queryset

        # Check user authentication
        # if (by_user or server_id) and not request.user.is_authenticated:
        #     raise AuthenticationFailed("You must be logged in to use this feature")

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


class MessageViewSet(viewsets.ViewSet):
    model = Message
    queryset = Message.objects.all()
    permission_classes = [IsAuthenticated]

    @message_list_docs
    def list(self, request: Request, *args, **kwargs):
        """
                Retrieve a list of messages for a specific channel.

                parameters:
                  - name: channel_id
                    description: The ID of the channel.
                    required: true
                    type: string
                    in: query
                """
        channel_id = request.query_params.get('channel_id')
        if channel_id is None:
            raise ValidationError("channel_id is required")
        try:
            conversation = get_object_or_404(Conversation, channel_id=int(channel_id))
        except ValueError:
            raise ValidationError("channel_id must be an integer")
        messages = self.queryset.filter(conversation=conversation)
        queryset = MessageSerializer(messages, many=True)
        return Response(queryset.data)
