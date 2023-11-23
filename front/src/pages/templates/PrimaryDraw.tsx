import React, {FC, ReactElement, ReactNode, useEffect, useState} from 'react';
import {Box, styled, useMediaQuery, useTheme} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import PrimaryDrawButton from "../../components/PrimaryDrawButton.tsx";

type Props = {
    children: ReactNode
}

type ChildProps = {
    isOpen: boolean
    toggleIsOpen: () => void
}

type ChildElement = ReactElement<ChildProps>

const PrimaryDraw: FC<Props> = ({children}) => {
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

                </Box>
                {React.Children.map(children, (child) => {
                    return React.isValidElement(child) ?
                        React.cloneElement(child as ChildElement, {isOpen}) :
                        child
                })}
            </Box>
        </Drawer>
    );
};

export default PrimaryDraw;