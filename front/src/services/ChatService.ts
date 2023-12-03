import useWebSocket from "react-use-websocket";
import {refreshToken} from "../helpers/AxiosHelper.ts";
import useCrud from "../hooks/useCrud.ts";
import {IMessage} from "../@types/message";
import {useNavigate} from "react-router-dom";
import {useAuthService} from "./AuthService.ts";
import {useState} from "react";
import {WS_URL} from "../config.ts";

const MAX_RECONNECT_COUNT = 3

export const useChatService = (serverId: string,
                               channelId: string) => {
    const [incomeMessages, setIncomeMessages] = useState<IMessage[]>([])
    const navigate = useNavigate()
    const {logout} = useAuthService()
    const socketUrl = channelId ? `${WS_URL}/${serverId}/${channelId}` : null
    const {fetchCallback} = useCrud<IMessage>([], `messages/?channel_id=${channelId}`)

    const {sendJsonMessage} = useWebSocket(socketUrl, {
            onOpen: async () => {
                console.log("opened")
                setIncomeMessages([])
                const data = await fetchCallback()
                setIncomeMessages(Array.isArray(data) ? data : [])
            },
            onError: (event) => console.log("error ws connection", event),
            onClose: async (event: CloseEvent) => {
                console.log(event)
                if (event.code == 4001) {
                    console.log("Auth error", event)
                    await refreshToken(navigate, logout)
                    return
                }
            },
            onMessage: (event) => {
                const data = JSON.parse(event.data)
                setIncomeMessages((prev) => [...prev, data.message])
            },
            shouldReconnect: () => true,
            reconnectAttempts: MAX_RECONNECT_COUNT,
            reconnectInterval: 50
        },
    )


    return {sendJsonMessage, incomeMessages}

}