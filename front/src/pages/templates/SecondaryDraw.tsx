import {Box, useTheme} from "@mui/material";

const SecondaryDraw = () => {


    const theme = useTheme()
    return (
        <Box sx={{
            width: theme.secondaryDraw.width,
            display: "block",
            mt: theme.primaryAppBar.height + "px" ,
            borderRight: `1px solid ${theme.palette.divider}`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            overflow: "auto",

        }}>
            {
                [...Array(100)].map((_, i) => (
                    <Box key={i}>SECONDARY {i}</Box>
                ))
            }
        </Box>
    );
};

export default SecondaryDraw;