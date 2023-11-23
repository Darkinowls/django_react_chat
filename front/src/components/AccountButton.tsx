import React from 'react';
import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import DarkModeSwitch from "./DarkModeSwitch.tsx";


const AccountButton = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const renderMenu = (
        <Menu
            open={isMenuOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            keepMounted={true}
            onClose={handleMenuClose}
        >
            <MenuItem>
                <DarkModeSwitch/>
            </MenuItem>
        </Menu>
    )

    return (
        <Box sx={{display: {xs: "flex"}}}>
            <IconButton
                edge={"end"}
                color={"inherit"}
                onClick={handleProfileMenuOpen}
            >
                <AccountCircle/>
            </IconButton>
            {renderMenu}
        </Box>
    );
};

export default AccountButton;