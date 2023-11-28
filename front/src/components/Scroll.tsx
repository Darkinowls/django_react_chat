import {Box, styled} from '@mui/material';
import React, {useCallback, useEffect, useRef} from 'react';

type Props = {
    children: React.ReactNode
}


const ScrollContainer = styled(Box)(({theme}) => ({
    height: `calc(100vh - 100px - 90px)`,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
        width: 8,
        height: 8,
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
    },
    "&::-webkit-scrollbar-track": {
        // backgroundColor: "#f0f0f0",
    },
    "&::-webkit-scrollbar-corner": {
        backgroundColor: "transparent",
    },

}))

const Scroll: React.FC<Props> = ({children}) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    const goToBottom = useCallback(() => {
        scrollRef.current?.scrollTo({top: scrollRef.current?.scrollHeight})
    }, [])

    useEffect(() => {
        goToBottom()
    }, [children]);
    return (
        <ScrollContainer ref={scrollRef}>
            {children}
        </ScrollContainer>
    );
};

export default Scroll;