import {AppBar, Box, Drawer, IconButton, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect, useState} from "react";
import ExploreCategories from "../../components/ExploreCategories";
import AccountButton from "../../components/AccountButton.tsx";
import { Link } from "react-router-dom";

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

    const list = () => (
        <Box
            sx={{paddingTop: theme.primaryAppBar.height + "px", minWidth: 200}}
            role={"presentation"}
            onClick={() => setSideBar(false)}
            onKeyDown={() => setSideBar(false)}
        >
            <ExploreCategories/>
        </Box>
    )


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
                    {list()}

                </Drawer>

                <Link to={"/"} style={{textDecoration:"none", color:"inherit"}} >
                    <Typography variant="h6"
                                sx={{display: {fontWeight: 700, letterSpacing: "-0.5px"}}}>DJChat</Typography>
                </Link>

                <Box sx={{flexGrow:1}}/>

                <AccountButton/>


            </Toolbar>
        </AppBar>
    );
};

export default PrimaryAppBar;