import {FC, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import createMuiTheme from '../theme/Theme';
import DarkModeContext from "../context/DarkModeContext.tsx";
import Cookies from "js-cookie";


interface Props {
    children: ReactNode
}

const ToggleColorMode: FC<Props> = ({children}) => {

    const getInitialMode = () => {
        const storedMode = Cookies.get('colorMode') as 'light' | 'dark' | undefined;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const storedInMedia = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
        return storedMode || storedInMedia;
    };

    const [mode, setMode] = useState<"light" | "dark">(getInitialMode());

    const toggleColorMode = useCallback(() => {
        setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
    }, [])

    useEffect(() => {
        Cookies.set('colorMode', mode);
    }, [mode]);

    // const colorMode = useMemo(() => toggleColorMode, [toggleColorMode])

    const theme = useMemo(() => createMuiTheme(mode), [mode])

    return (
        <DarkModeContext.Provider value={{toggleColorMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </DarkModeContext.Provider>
    );
};

export default ToggleColorMode;