import {Box, useTheme} from "@mui/material";

const SecondaryDraw = () => {
    const theme = useTheme()
    return (
        <Box sx={{minWidth: theme.secondaryDraw.width, mt:theme.primaryAppBar.height+"px"}}>
            {
                [...Array(100)].map((_, i) => (
                    <Box key={i}>Space {i}</Box>
                ))
            }
        </Box>
    );
};

export default SecondaryDraw;