import {
    Avatar,
    Box,
    List,
    ListItem, ListItemAvatar,
    ListItemText,
    Typography
} from '@mui/material';
import useCrud from '../hooks/useCrud';
import {FC, useEffect} from 'react';
import {BASE_URL} from "../config.ts";
import { Link } from 'react-router-dom';

interface Server {
    id: string
    name: string
    description: string
    category: string
    icon: string
}

type Props = {
    isOpen: boolean
}

const PopularChannels: FC<Props> = ({isOpen}) => {
    const {
        prevData, fetchCallback
    } = useCrud<Server>([], "server/")

    useEffect(() => {
        fetchCallback().then(() => console.log(prevData))
    }, []);


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
                    Popular
                </Typography>


            </Box>
            <List sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>


                {prevData.map((server) => (


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

export default PopularChannels;