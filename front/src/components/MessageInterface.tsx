import {FC, FormEvent, useState} from 'react';
import useWebSocket from "react-use-websocket";
import {useParams} from "react-router-dom";
import useCrud from "../hooks/useCrud.ts";
import {IMessage} from "../@types/message";
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
    useTheme
} from '@mui/material';

import {IServer} from "../@types/server";
import MessageInterfaceChannels from "./MessageInterfaceChannels.tsx";
import Scroll from "./Scroll.tsx";

type Props = {
    server: IServer
}

const MessageInterface: FC<Props> = ({server}) => {

    const [incomeMessage, setIncomeMessage] = useState<IMessage[]>([])
    const [inputMessage, setInputMessage] = useState("")
    const {serverId, channelId} = useParams()

    const theme = useTheme()

    const socketUrl = channelId ? `ws://127.0.0.1:8000/ws/${serverId}/${channelId}` : null

    const {fetchCallback} = useCrud<IMessage>([], `messages/?channel_id=${channelId}`)

    const {sendJsonMessage} = useWebSocket(socketUrl, {
        onOpen: async () => {
            setIncomeMessage([])
            const data = await fetchCallback()
            setIncomeMessage(Array.isArray(data) ? data : [])
            console.log("opened ws connection");
        },
        onError: (event) => console.log("error ws connection", event),
        onClose: (event) => console.log("closed ws connection", event),
        onMessage: (event) => {
            console.log(event.data)
            const data = JSON.parse(event.data)
            setIncomeMessage((prev) => [...prev, data.message])
        }
    })

    const formatTimeStamps = (datestamp: string): string => {
        const dateObj = new Date(datestamp)
        const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`
        const formattedTime = dateObj.toLocaleTimeString([],
            {hour: '2-digit', minute: '2-digit', hour12: false})
        return formattedDate + ' ' + formattedTime
    }

    // @ts-ignore
    const sendViaKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter" || e.shiftKey) {
            return;
        }

        e.preventDefault()
        if (inputMessage.length === 0) {
            return
        }
        sendJsonMessage({
            type: "message",
            text: inputMessage,
        })
        setInputMessage("")
    }

    return (
        <>
            <MessageInterfaceChannels server={server}/>
            {channelId === undefined ? <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    p: {xs: 0},
                    height: `calc(100vh-100px)`,
                }}>

                    <Box> <Typography
                        variant={"h4"}
                        fontWeight={"bold"}
                        letterSpacing={"0.5px"}
                        sx={{px: 5, maxWidth: "600px"}}
                    >
                        Welcome to {server?.name}
                    </Typography>
                        <Typography
                            variant={"body1"}
                            sx={{px: 5, maxWidth: "600px"}}
                        >
                            {server?.description.length > 0 ? server.description : "The home page of this server"}
                        </Typography>
                    </Box>
                </Box>

                :

                <Box
                    sx={{
                        overflow: "hidden",
                        p: 0,
                    }}

                >
                    <Scroll>

                        <List sx={{
                            overflow: "hidden",
                            bg: "background.paper"

                        }}>
                            {incomeMessage.map((message) => {
                                return (

                                    <ListItem key={message.id} alignItems={"flex-start"}>

                                        <ListItemAvatar>
                                            <Avatar alt="user image">

                                            </Avatar>
                                        </ListItemAvatar>

                                        <ListItemText
                                            primaryTypographyProps={{fontSize: "12px", variant: "body2"}}
                                            primary={
                                                <>
                                                    <Typography
                                                        variant={"body1"}
                                                        color={"text.primary"}
                                                        sx={{fontWeight: 700}}
                                                        component={"span"}>
                                                        {message.sender}
                                                        {" "}

                                                    </Typography>
                                                    <Typography
                                                        component={"span"}
                                                        variant={"caption"}
                                                        color={"text.secondary"}
                                                    >
                                                        {" at "}
                                                        {formatTimeStamps(message.timestamp)}
                                                    </Typography>
                                                </>

                                            }
                                            secondaryTypographyProps={{fontSize: "14px", variant: "body1"}}
                                            secondary={
                                                <Typography

                                                    variant={"body1"}
                                                    style={{
                                                        overflow: "visible",
                                                        whiteSpace: "normal",
                                                        textOverflow: "clip",
                                                    }}
                                                    sx={{
                                                        lineHeight: 1.2,
                                                        fontWeight: 400,
                                                        letterSpacing: "-0.2px",
                                                    }}
                                                >

                                                    {message.text}
                                                </Typography>}
                                        >

                                        </ListItemText>


                                    </ListItem>


                                )
                            })}
                        </List>
                    </Scroll>


                    <Box sx={{
                        overflow: "hidden",
                        position: "relative",
                        bottom: 0,
                        width: "100%"
                    }}>

                        <form
                            style={{
                                bottom: 0,
                                right: 0,
                                padding: "1rem",
                                backgroundColor: theme.palette.background.default,
                                zIndex: 1
                            }}>

                            <Box sx={{display: "flex"}}>
                                <TextField
                                    placeholder={"Write a message..."}
                                    fullWidth={true}
                                    minRows={1}
                                    maxRows={4}
                                    value={inputMessage}
                                    multiline={true}
                                    sx={{flexGrow: 1}}
                                    onKeyDown={sendViaKey}
                                    onChange={e => setInputMessage(e.target.value)}

                                >

                                </TextField>
                            </Box>
                        </form>
                    </Box>
                </Box>
            }
        </>

    )
        ;
};

export default MessageInterface;