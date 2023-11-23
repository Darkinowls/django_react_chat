import {createTheme, responsiveFontSizes} from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar: {
            height: number;
        }
        primaryDraw: {
            width: number;
            closedWidth: number;
        }


        body1: {
            fontWeight: number;
            letterSpacing: string;
        }

        body2: {
            fontWeight: number;
            letterSpacing: string;
            fontSize: string;
        }
        secondaryDraw: {
            width: number;
        }
    }

    interface ThemeOptions {
        primaryAppBar?: {
            height?: number;
        }

        primaryDraw?: {
            width?: number;
            closedWidth?: number;
        }

        body1?: {
            fontWeight?: number;
            letterSpacing?: string;
        }
        body2?: {
            fontWeight?: number;
            letterSpacing?: string;
            fontSize?: string;
        }

        secondaryDraw?: {
            width?: number;
        }

    }
}

const createMuiTheme = (mode: "light" | "dark") => {

    let theme = createTheme({
        typography: {
            fontFamily: ['IBM Plex Sans', "sans-serif"].join(','),
            fontSize: 14,
        },
        body1: {
            fontWeight: 500,
            letterSpacing: "-0.5px",
        },
        body2: {
            fontWeight: 500,
            fontSize: "15px",
            letterSpacing: "-0.5px",
        },
        primaryAppBar: {
            height: 50,
        },
        primaryDraw: {
            width: 200,
            closedWidth: 60,
        },
        secondaryDraw: {
            width: 200,
        },
        palette: {
            mode: mode,
        },
        components: {
            MuiAppBar: {
                defaultProps: {
                    color: "default",
                    elevation: 0,
                }
            }
        }
    })

    return responsiveFontSizes(theme)
}

export default createMuiTheme