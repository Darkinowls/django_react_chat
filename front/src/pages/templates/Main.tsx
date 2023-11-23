import {Box, useTheme} from "@mui/material";
import {FC, ReactNode} from "react";

type Props = {
    children: ReactNode
}
const Main: FC<Props> = ({children}) => {
    const theme = useTheme()
    return (
        <Box sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            paddingTop: theme.primaryAppBar.height + "px",
            overflowX: "hidden",
        }}>
            {children}
        </Box>
    );
};

export default Main;