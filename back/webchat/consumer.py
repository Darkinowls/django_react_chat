from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.layers import InMemoryChannelLayer
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser

from webchat.models import Conversation, Message


class WebChatConsumer(AsyncJsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.channel: InMemoryChannelLayer = None
        self.channel_id = None
        self.server_id = None

    async def connect(self):
        self.user: AbstractUser = self.scope["user"]
        await self.accept()
        if not self.user.is_authenticated:
            await self.close(code=4001)
            return
        self.channel: InMemoryChannelLayer = self.channel_layer
        self.channel_id = str(self.scope["url_route"]["kwargs"]["channelId"])
        await self.channel.group_add(self.channel_id, self.channel_name)

    async def receive_json(self, content: dict, **kwargs):
        conv, _ = await sync_to_async(Conversation.objects.get_or_create)(channel_id=self.channel_id)
        new_message: Message = await Message.objects.acreate(conversation=conv,
                                                             sender=self.user,
                                                             text=content["text"])
        await self.channel.group_send(
            self.channel_id,
            {
                "type": "chat.message",
                "message": {
                    "id": new_message.id,
                    "sender": new_message.sender.username,
                    "text": new_message.text,
                    "timestamp": new_message.timestamp.isoformat(),
                }
            },
        )

    async def chat_message(self, event):
        await self.send_json(event)

    async def disconnect(self, close_code):
        if self.channel_id is not None:
            await self.channel.group_discard(self.channel_id, self.channel_name)
        await super().disconnect(close_code)
