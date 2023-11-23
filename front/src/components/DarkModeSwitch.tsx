import {useContext} from 'react';
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import DarkModeContext from "../context/DarkModeContext.tsx";
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Brightness4Icon from "@mui/icons-material/Brightness4";

const DarkModeSwitch = () => {
    const theme = useTheme()
    const colorMode = useContext(DarkModeContext)

    return (
        <Box onClick={colorMode.toggleColorMode} sx={{display: "flex", alignItems: "center"}}>
            <Brightness4Icon sx={{mr: "6px", fontSize: "20px"}}/>
            <Typography variant={"body2"} sx={{textTransform: "capitalize"}}>
                {theme.palette.mode} mode
            </Typography>
            <IconButton
                sx={{m: 0, p: 0, pl: 2}}
                color="inherit"
            >

                {theme.palette.mode === "dark" ?
                    (<ToggleOffIcon sx={{fontSize: "2.5rem", p: 0}}></ToggleOffIcon>) :
                    (<ToggleOnIcon sx={{fontSize: "2.5rem"}}></ToggleOnIcon>)}

            </IconButton>

        </Box>
    );
};

export default DarkModeSwitch;