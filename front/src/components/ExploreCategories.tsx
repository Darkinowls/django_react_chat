import {useEffect} from 'react';
import useCrud from "../hooks/useCrud.ts";
import {
    Box,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {BASE_URL} from "../config.ts";


interface Category {
    id: string
    name: string
    description: string
    icon: string
}

const ExploreCategories = () => {

    const {
        data, fetchCallback
    } = useCrud<Category>([], "category")

    const theme = useTheme()

    const isDarkMode = theme.palette.mode === "dark"

    useEffect(() => {
        fetchCallback()
    }, []);

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
                Explore
            </Box>
            <List sx={{
                py: 0,
            }}>
                {data.map((category) => (
                    <ListItem disablePadding key={category.id} sx={{display: "block"}} dense={true}>

                        <Link href={`/category/${category.name}`} style={{textDecoration: "none", color: "inherit"}}>
                            <ListItemButton sx={{minHeight: 48}}>
                                <ListItemAvatar sx={{minWidth: 0, mr: 1}}>
                                    <img src={BASE_URL + category.icon} alt={category.name}
                                         style={{
                                             width: "25px",
                                             height: "25px",
                                             filter: isDarkMode ? "invert(1)" : "none",
                                             alignItems: "center",
                                             display: "flex"
                                         }}/>
                                </ListItemAvatar>
                                <ListItemText primary={<Typography variant={"body1"} textAlign={"start"}>
                                    {category.name}
                                </Typography>}></ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}

            </List>
        </>
    );
};

export default ExploreCategories;