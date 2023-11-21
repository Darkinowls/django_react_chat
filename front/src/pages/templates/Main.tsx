
import {Box, useTheme} from "@mui/material";

const Main = () => {
    const theme = useTheme()
    return (
        <Box sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            paddingTop: theme.primaryAppBar.height + "px",
            overflowX: "hidden",
        }}>
            {
                [...Array(10)].map((_, i) => (
                    <Box key={i}>MAIN {i}</Box>
                ))
            }
        </Box>
    );
};

export default Main;