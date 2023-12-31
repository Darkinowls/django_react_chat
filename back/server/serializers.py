from rest_framework import serializers

from server.models import Server, Channel, Category
from webchat.models import Message


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class ServerSerializer(serializers.ModelSerializer):
    channel_server = ChannelSerializer(many=True, read_only=True)
    category = serializers.StringRelatedField()
    num_members = serializers.SerializerMethodField()

    class Meta:
        model = Server
        exclude = ["member"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data.get("num_members", None) is None:
            data.pop("num_members")
        return data

    def get_num_members(self, obj):
        if hasattr(obj, "num_members"):
            return obj.num_members
        return None


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    class Meta:
        model = Message
        fields = "__all__"
