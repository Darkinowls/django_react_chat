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

        secondaryDraw: {
            width: number;
        }
    }

    interface ThemeOptions {
        primaryAppBar?: {
            height?: number;
        },

        primaryDraw?: {
            width?: number;
            closedWidth?: number;
        }

        secondaryDraw?: {
            width?: number;
        }

    }
}

const createMuiTheme = () => {

    let theme = createTheme({
        typography: {
            fontFamily: ['IBM Plex Sans', "sans-serif"].join(','),
            fontSize: 14,
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