import React, {useCallback, useEffect} from 'react';
import {Box, CssBaseline} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar.tsx";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";
import Main from "./templates/Main.tsx";
import MessageInterface from "../components/MessageInterface.tsx";
import ServerChannels from "../components/ServerChannels.tsx";
import UserServers from "../components/UserServers.tsx";
import {useNavigate, useParams} from "react-router-dom";
import useCrud from "../hooks/useCrud.ts";
import {IChannel, IServer} from "../@types/server";


const Server = () => {

    const navigate = useNavigate()
    const {serverId, channelId} = useParams()

    const {data, fetchCallback, loading, error} =
        useCrud<IServer>([], `server/${serverId}`)

    useEffect(() => {
        fetchCallback()
    }, []);

    const isValidChannelField = useCallback((): boolean => {
        if (!channelId) {
            return true
        }
        return data
            .some((server) => server.channel_server
                .some((channel: IChannel) => channel.id.toString() === channelId))
    }, [channelId, data])

    useEffect(() => {
        if (!isValidChannelField() && data.length > 0) {
            navigate(`/server/${serverId}`)
        }
    }, [isValidChannelField, data, serverId])


    if (error) {
        navigate("/")
        return null
    }


    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline></CssBaseline>
            <PrimaryAppBar></PrimaryAppBar>
            <PrimaryDraw><UserServers isOpen={true} servers={data}/></PrimaryDraw>
            <SecondaryDraw><ServerChannels servers={data}/></SecondaryDraw>
            <Main><MessageInterface/></Main>
        </Box>
    )
        ;
};

export default Server;