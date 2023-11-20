import {Box,} from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw.tsx";
import SecondaryDraw from "./templates/SecondaryDraw.tsx";


const Home = () => {
    return (
        <Box sx={{display: "flex"}}>
            <PrimaryAppBar></PrimaryAppBar>
            <PrimaryDraw></PrimaryDraw>
            <SecondaryDraw></SecondaryDraw>
        </Box>
    );
};

export default Home;