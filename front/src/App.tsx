import Home from "./pages/Home.tsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import createMuiTheme from "./theme/Theme.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path={"/"} element={<Home/>}/>
        </Route>
    )
)

const App = () => (
    <ThemeProvider theme={createMuiTheme()}><RouterProvider router={router}></RouterProvider></ThemeProvider>
);

export default App
