import {AppBar, Box, Drawer, IconButton, Link, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect, useState} from "react";

const PrimaryAppBar = () => {
    const theme = useTheme()
    const [isSideBar, setSideBar] = useState(false)
    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"))

    useEffect(() => {
        if (isSmallScreen && isSideBar) setSideBar(false)
    }, [isSmallScreen])

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

    return (
        <AppBar sx={{
            backgroundColor: theme.palette.background.default,
            borderBottom: "1px solid " + theme.palette.divider,
            zIndex: theme.zIndex.drawer + 1,
        }}>
            <Toolbar sx={{
                height: theme.primaryAppBar.height
            }} variant="dense">

                <Box sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                    }
                }}>
                    <IconButton
                        onClick={getSideBarCallback(!isSideBar)}
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 1}}
                    ><MenuIcon/></IconButton>
                </Box>

                <Drawer
                    open={isSideBar}
                    onClose={getSideBarCallback(false)}
                >
                    <Box sx={{mb: theme.primaryAppBar.height + "px"}}> </Box>
                    {[...Array(100)].map((_, i) => (
                        <Typography key={i}>Space {i}</Typography>
                    ))}
                </Drawer>

                <Link href={"/"} underline={"none"} color={"inherit"}>
                    <Typography variant="h6"
                                sx={{display: {fontWeight: 700, letterSpacing: "-0.5px"}}}>DJChat</Typography>
                </Link>


            </Toolbar>
        </AppBar>
    );
};

export default PrimaryAppBar;