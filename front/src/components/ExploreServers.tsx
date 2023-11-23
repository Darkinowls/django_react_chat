import {useEffect} from 'react';
import {useParams} from "react-router-dom";
import useCrud from "../hooks/useCrud.ts";
import {
    Box,
    Link,
    Card,
    Container,
    Grid,
    Typography,
    CardMedia,
    CardContent,
    List,
    ListItem,
    ListItemAvatar, ListItemIcon, Avatar, ListItemText
} from '@mui/material';
import {BASE_URL} from "../config.ts";

interface Server {
    id: string
    name: string
    description: string
    category: string
    icon: string
    banner: string
}

const ExploreServers = () => {
    const {categoryName} = useParams()
    const url = categoryName ? `server/?category=${categoryName}` : "server"
    const {data, fetchCallback} = useCrud<Server>([], url)

    useEffect(() => {
        fetchCallback()
    }, [categoryName]);

    return (
        <>
            <Container maxWidth={"lg"}>
                <Box sx={{pt: 6}}>
                    <Typography variant={"h3"} noWrap component={"h1"}
                                sx={{
                                    textAlign: {sx: "center", sm: "left"},
                                    display: {sm: "block", fontWeight: 700, letterSpacing: "-2px"}
                                }}>
                        {categoryName ? categoryName : "Popular Channels"}
                    </Typography>
                </Box>
                <Box sx={{pt: 1}}>
                    <Typography variant={"h6"} noWrap component={"h2"} color={"textSecondary"}
                                sx={{
                                    textAlign: {sx: "center", sm: "left"},
                                    display: {sm: "block", fontWeight: 700, letterSpacing: "-0.5px"}
                                }}>
                        {categoryName ? `Channels talking about ${categoryName}` : "Checkout out these popular channels"}
                    </Typography>
                </Box>

                <Typography variant={"h6"} sx={{pt: 6, pb: 1, fontWeight: 700, letterSpacing: "-0.5px"}}>
                    Recommended Channels
                </Typography>

                <Grid container spacing={{xs: 0, sm: 2}}>
                    {data.map((server) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={server.id}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    // backgroundImage: "none"
                                }}>
                                <Link href={`server/${server.id}`} style={{textDecoration: "none", color: "inherit"}}>

                                    <CardMedia
                                        component={"img"}
                                        image={server.banner ?
                                            BASE_URL + server.banner
                                            : "https://source.unsplash.com/random"}
                                        sx={{display: {xs: "none", sm: "block"}}}

                                    />

                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            p: 0,
                                            pl: 2,
                                            "&:last-child": {paddingBottom: 0},
                                        }}
                                    >
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemIcon>
                                                    <ListItemAvatar sx={{
                                                        minWidth: "50px",
                                                        mr: 1
                                                    }}>
                                                        <Avatar
                                                            alt={"Server icon"}
                                                            src={`${BASE_URL + server.icon}`}>

                                                        </Avatar>
                                                    </ListItemAvatar>
                                                </ListItemIcon>
                                                <ListItemText

                                                    primary={<Typography
                                                        variant={"body2"}
                                                        textAlign={"start"}
                                                        sx={{
                                                            textOverflow: "ellipsis",
                                                            overflow: "hidden",
                                                            whiteSpace: "nowrap",
                                                            fontWeight: 700,
                                                        }}>
                                                        {server.name}
                                                    </Typography>}

                                                    secondary={
                                                        <Typography variant={"body2"}>
                                                            {server.category}
                                                        </Typography>}

                                                />
                                            </ListItem>
                                        </List>

                                    </CardContent>
                                </Link>

                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </>
    );
};


export default ExploreServers;