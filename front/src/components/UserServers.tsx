import {Avatar, Box, Link, List, ListItem, ListItemAvatar, ListItemText, Typography} from '@mui/material';
import {FC} from 'react';
import {BASE_URL} from "../config.ts";
import {IServer} from "../@types/server"

type Props = {
    isOpen: boolean
    servers: IServer[]
}

const UserServers: FC<Props> = ({isOpen, servers}) => {

    return (
        <>
            <Box sx={{
                height: 50,
                p: 2,
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                // flex: "1 1 100%",
            }}>

                <Typography sx={{display: isOpen ? "flex" : "none"}}>
                    Servers
                </Typography>


            </Box>
            <List sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>


                {servers.map((server) => (


                    <ListItem key={server.id} dense={true} sx={{display: "block"}}>
                        <Link to={`/server/${server.id}`} style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex"
                        }}>

                            <ListItemAvatar>
                                <Avatar alt={server.name} src={`${BASE_URL}${server.icon}`}>S</Avatar>
                            </ListItemAvatar>

                            <ListItemText

                                primary={<Typography variant={"body2"} sx={{
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    textOverflow: "ellipsis",
                                }}>
                                    {server.name}
                                </Typography>}

                                secondary={<Typography variant={"body2"} sx={{
                                    fontWeight: 400,
                                    lineHeight: 1.2
                                }}>
                                    {server.category} </Typography>}

                                sx={{opacity: isOpen ? 1 : 0}}
                                primaryTypographyProps={{
                                    sx: {textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}
                                }}
                            />

                        </Link>
                    </ListItem>


                ))}
            </List>

        </>
    );
};

export default UserServers;