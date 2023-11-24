import {FC} from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {IChannel, IServer} from "../@types/server";
import { Link } from 'react-router-dom';


type Props = {
    servers: IServer[]
}

const ServerChannels: FC<Props> = ({servers}) => {

    const theme = useTheme()

    const channels: IChannel[] = servers.flatMap(server => server.channel_server)


    return (
        <>
            <Box
                sx={{
                    height: "50px",
                    display: "flex",
                    px: 2,
                    alignItems: "center",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    position: "sticky",
                    top: 0,
                    backgroundColor: theme.palette.background.default,
                }}>
                <Typography variant={"body1"}
                            style={{textOverflow: "ellipsis", overflow: "hidden", whitespace: "nowrap"}}>
                    Channels in {servers[0]?.name}
                </Typography>
            </Box>
            <List sx={{
                py: 0,
            }}>
                {channels.map((channel) => (
                    <ListItem disablePadding key={channel.id} sx={{display: "block"}} dense={true}>

                        <Link to={`/server/${channel.server}/${channel.id}`} style={{textDecoration: "none", color: "inherit"}}>
                            <ListItemButton sx={{minHeight: 48}}>
                                <ListItemText primary={<Typography variant={"body1"} textAlign={"start"}>
                                    {channel.name}
                                </Typography>}></ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}

            </List>
        </>
    );
};

export default ServerChannels;