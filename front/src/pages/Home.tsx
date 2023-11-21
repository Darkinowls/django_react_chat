import {Box, CssBaseline,} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";
import Main from "./templates/Main.tsx";


const Home = () => {
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline></CssBaseline>
            <PrimaryAppBar></PrimaryAppBar>
            <PrimaryDraw></PrimaryDraw>
            <SecondaryDraw></SecondaryDraw>
            <Main></Main>
        </Box>
    );
};

export default Home;