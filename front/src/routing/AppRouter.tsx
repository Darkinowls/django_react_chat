import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Server from "../pages/Server.tsx";
import Explore from "../pages/Explore.tsx";
import TestLogin from "../pages/TestLogin.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Register from "../pages/Register.tsx";
import {MemberContextProvider} from "../context/MemberContext.tsx";
import MembershipCheck from "../components/MembershipCheck.tsx";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path={"/"} element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/server/:serverId/:channelId?"} element={<ProtectedRoute>
                <MemberContextProvider>
                    <MembershipCheck>
                        <Server/>
                    </MembershipCheck>
                </MemberContextProvider>
            </ProtectedRoute>}/>
            <Route path={"/category/:categoryName"} element={<ProtectedRoute><Explore/></ProtectedRoute>}/>
            <Route path={"/test"} element={<ProtectedRoute><TestLogin/></ProtectedRoute>}/>
            <Route path={"/register"} element={<Register/>}/>

        </Routes>
    )
}
