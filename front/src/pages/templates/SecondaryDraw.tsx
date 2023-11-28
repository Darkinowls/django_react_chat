import {Box, useTheme} from "@mui/material";
import {FC, ReactNode} from "react";


type Props = {
    children: ReactNode
}

const SecondaryDraw: FC<Props> = ({children}) => {


    const theme = useTheme()
    return (
        <Box sx={{
            width: theme.secondaryDraw.width,
            minWidth: theme.secondaryDraw.width,
            display: {xs: "none", sm: "flex"},
            flexDirection: "column",
            mt: theme.primaryAppBar.height + "px",
            borderRight: `1px solid ${theme.palette.divider}`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            overflowX: "hidden",

        }}>
            {children}

        </Box>
    );
};

export default SecondaryDraw;