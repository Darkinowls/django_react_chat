import Home from "./pages/Home.tsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Explore from "./pages/Explore.tsx";
import ToggleColorMode from "./components/ToggleColorMode.tsx";
import Server from "./pages/Server.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/server/:serverId/:channelId?"} element={<Server/>}/>
            <Route path={"/category/:categoryName"} element={<Explore/>}/>

        </Route>
    )
)

const App = () => (
    <ToggleColorMode><RouterProvider router={router}></RouterProvider></ToggleColorMode>
);

export default App
