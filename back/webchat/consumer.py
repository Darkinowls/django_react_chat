from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.layers import InMemoryChannelLayer


class WebChatConsumer(AsyncJsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel: InMemoryChannelLayer = None
        self.channel_id = None
        self.server_id = None
        self.user = None

    async def connect(self):
        self.channel: InMemoryChannelLayer = self.channel_layer
        await self.accept()
        print(self.scope)
        self.channel_id = str(self.scope["url_route"]["kwargs"]["channelId"])
        await self.channel.group_add(self.channel_id, self.channel_name)

    async def receive_json(self, content: dict, **kwargs):
        await self.channel.group_send(
            self.channel_id,
            {
                "type": "chat.message",
                "message": content["text"]
            },
        )

    async def chat_message(self, event):
        await self.send_json(event)

    async def disconnect(self, close_code):
        pass
