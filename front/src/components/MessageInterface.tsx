import {FC} from 'react';
import {useParams} from "react-router-dom";
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
import {useChatService} from "../services/ChatService.ts";

type Props = {
    server: IServer
}

const formatTimeStamps = (datestamp: string): string => {
    const dateObj = new Date(datestamp)
    const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`
    const formattedTime = dateObj.toLocaleTimeString([],
        {hour: '2-digit', minute: '2-digit', hour12: false})
    return formattedDate + ' ' + formattedTime
}


const MessageInterface: FC<Props> = ({server}) => {


    const {serverId, channelId} = useParams()
    const theme = useTheme()

    const {
        incomeMessages,
        sendJsonMessage,
    } = useChatService(serverId!, channelId!)

    // @ts-ignore
    const sendViaKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter" || e.shiftKey) {
            return;
        }

        e.preventDefault()
        if (e.target.value.length === 0) {
            return
        }
        sendJsonMessage({
            type: "message",
            text: e.target.value,
        })
        e.target.value = ""
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
                            {incomeMessages.map((message) => {
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
                        width: "100%",
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
                                    multiline={true}
                                    sx={{flexGrow: 1}}
                                    onKeyDown={sendViaKey}
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