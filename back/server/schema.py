from drf_spectacular.utils import OpenApiParameter, extend_schema

server_list_docs = extend_schema(
    description="List servers based on specified parameters.",
    parameters=[
        OpenApiParameter(
            name="category",
            description="Filter servers by category.",
            type=str,
            required=False,
        ),
        OpenApiParameter(
            name="qty",
            description="Limit the number of servers returned.",
            type=int,
            required=False,
        ),
        OpenApiParameter(
            name="by_user",
            description="Filter servers by user membership.",
            type=bool,
            required=False,
        ),
        OpenApiParameter(
            name="server_id",
            description="Filter servers by server ID.",
            type=int,
            required=False,
        ),
        OpenApiParameter(
            name="with_num_members",
            description="Include the number of members in the response.",
            type=bool,
            required=False,
        ),
    ],
)
