import {Box, CssBaseline,} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";
import Main from "./templates/Main.tsx";
import PopularChannels from "../components/PopularChannels.tsx";
import ExploreCategories from "../components/ExploreCategories.tsx";
import ExploreServers from "../components/ExploreServers.tsx";


const Explore = () => {
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline></CssBaseline>
            <PrimaryAppBar></PrimaryAppBar>
            <PrimaryDraw><PopularChannels isOpen={false}/></PrimaryDraw>
            <SecondaryDraw><ExploreCategories/></SecondaryDraw>
            <Main><ExploreServers/></Main>
        </Box>
    );
};

export default Explore;