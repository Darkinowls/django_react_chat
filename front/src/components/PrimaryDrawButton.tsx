import {Box, IconButton} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

type Props = {
    isOpen: boolean,
    toggleIsOpen: () => void,
}


const PrimaryDrawButton = (props: Props) => {
    return (
        <Box sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <IconButton onClick={props.toggleIsOpen}>
                {props.isOpen ? <ChevronLeft/> : <ChevronRight/>}
            </IconButton>
        </Box>
    );
};

export default PrimaryDrawButton;