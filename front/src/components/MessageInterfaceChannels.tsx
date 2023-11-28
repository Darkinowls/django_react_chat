import React, {FC, useEffect, useState} from 'react';
import {IServer} from "../@types/server";
import {
    AppBar,
    Avatar,
    Box, Drawer,
    IconButton,
    ListItemAvatar,
    Toolbar,
    Typography, useMediaQuery,
    useTheme
} from '@mui/material';
import {useParams} from "react-router-dom";
import {BASE_URL} from "../config.ts";
import {MoreVert} from "@mui/icons-material";

import ServerChannels from "./ServerChannels.tsx";
import ExploreCategories from "./ExploreCategories.tsx";


type Props = {
    server: IServer
}


const MessageInterfaceChannels: FC<Props> = ({server}) => {

    const {channelId} = useParams()

    const channel = server?.channel_server
        .find((channel) => channel.id.toString() === channelId)

    const theme = useTheme()

    const [isSideBar, setSideBar] = useState(false)

    const getSideBarCallback = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setSideBar(open)
    }

    const list = () => (
        <Box
            sx={{paddingTop: theme.primaryAppBar.height + "px", minWidth: 200}}
            role={"presentation"}
            onClick={getSideBarCallback(false)}
            onKeyDown={getSideBarCallback(false)}
        >
            <ExploreCategories/>
        </Box>
    )

    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"))

    useEffect(() => {
        if (isSmallScreen && isSideBar) setSideBar(false)
    }, [isSmallScreen])

    return (
        <AppBar
            color={"default"}
            position={"sticky"}
            sx={{
                backgroundColor: theme.palette.background.default,
            }}
            elevation={0}
        >

            <Toolbar
                variant={"dense"}
                sx={{
                    minHeight: theme.primaryAppBar.height,
                    height: theme.primaryAppBar.height,
                    display: "flex",
                    // alignItems: "center",
                    borderBottom: `1px solid ${theme.palette.divider}`

                }}>
                <Box sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                    },
                }}>
                    <ListItemAvatar>
                        <Avatar
                            alt={"Server icon"}
                            src={`${BASE_URL}${server?.icon}`}
                            sx={{
                                width: 30,
                                height: 30,
                            }}

                        >

                        </Avatar>
                    </ListItemAvatar>
                </Box>
                <Typography noWrap component={"div"}>
                    {channel?.name}
                </Typography>

                <Box sx={{flexGrow: 1}}></Box>

                <Box sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                    },
                }}>
                    <IconButton color={"inherit"} edge={"end"} onClick={getSideBarCallback(true)}>
                        <MoreVert></MoreVert>
                    </IconButton>
                </Box>

                <Drawer

                    anchor={"left"}
                    open={isSideBar}
                    onClose={getSideBarCallback(false)}

                >
                    {list()}
                </Drawer>

            </Toolbar>
        </AppBar>
    );
};

export default MessageInterfaceChannels;