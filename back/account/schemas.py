from drf_spectacular.utils import extend_schema, OpenApiParameter

from account.serializers import AccountSerializer

account_list = extend_schema(responses=AccountSerializer,
                             parameters=[
                                 OpenApiParameter(
                                     name='user_id',
                                     description='user_id',
                                     required=True,
                                     type=int,
                                 )
                             ],
                             )
