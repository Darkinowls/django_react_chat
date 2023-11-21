import {useEffect, useState} from 'react';
import {Box, styled, useMediaQuery, useTheme} from "@mui/material";
import PrimaryDrawButton from "../../components/PrimaryDrawButton.tsx";
import MuiDrawer from "@mui/material/Drawer";

const PrimaryDraw = () => {
    const [isOpen, setIsOpen] = useState(true)
    const theme = useTheme()
    const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

    const openedMixin = () => ({
        transaction: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        overflowX: "hidden",
        width: theme.primaryDraw.width,
    })

    const closedMixin = () => ({
        transaction: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        overflowX: "hidden",
        width: theme.primaryDraw.closedWidth,
    })

    // @ts-ignore
    const Drawer = styled(MuiDrawer)(({theme}) =>
        ({
            width: theme.primaryDraw.width,
            whiteSpace: "nowrap",
            boxSizing: "border-box",
            ...(isOpen && {...openedMixin(), "& .MuiDrawer-paper": openedMixin()}),
            ...(!isOpen && {...closedMixin(), "& .MuiDrawer-paper": closedMixin()}),
        }))

    const toggleIsOpen = () => setIsOpen(!isOpen)

    useEffect(() => {
        if (isExtraSmallScreen) {
            setIsOpen(false)
            return
        }
        setIsOpen(true)
    }, [isExtraSmallScreen])

    return (
        <Drawer open={isOpen} variant={isExtraSmallScreen ? "temporary" : "permanent"}
                PaperProps={{
                    sx: {
                        mt: theme.primaryAppBar.height + "px",
                        width: theme.primaryDraw.width,
                    }
                }}
        >
            <Box>
                <Box sx={{position: "absolute", right: 0, top: 0}}>
                    <PrimaryDrawButton isOpen={isOpen} toggleIsOpen={toggleIsOpen}/>
                    {
                        [...Array(100)].map((_, i) => (
                            <Box key={i}>Space {i}</Box>
                        ))
                    }

                </Box>
            </Box>
        </Drawer>
    );
};

export default PrimaryDraw;