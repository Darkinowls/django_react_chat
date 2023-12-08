import axios from "axios";
import {BASE_API_URL} from "../config.ts";
import {AuthServiceProps} from "../@types/auth-service";
import {useState} from "react";
import LocalStorageConsts from "../const/LocalStorageConsts.ts";
import {useNavigate} from "react-router-dom";


// const getUserDetails = async (): Promise<string | Error> => {
//     const userId = localStorage.getItem(LocalStorageConsts.UserId)
//     if (userId === null) {
//         return Error("User id not found");
//     }
//     try {
//         const response = await axios.get(
//             BASE_API_URL + `/account?user_id=${userId}`,
//             {
//                 withCredentials: true,
//             }
//         );
//         const username = response.data.username;
//         localStorage.setItem(LocalStorageConsts.Username, username)
//         return username;
//     } catch (e) {
//         return e as Error;
//     }
// }

export const useAuthService = (): AuthServiceProps => {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const userId = localStorage.getItem(LocalStorageConsts.UserId)
        return userId !== null;
    });

    const login = async (username: string, password: string): Promise<number> => {
        try {
            const res = await axios.post(BASE_API_URL + '/token/',
                {username, password},
                {
                    withCredentials: true,
                }
            );
            localStorage.setItem(LocalStorageConsts.UserId, res.data.user_id)
            setIsAuthenticated(true)
            return 200
        } catch (e) {
            setIsAuthenticated(false)
            return 401
        }
    }

    const register = async (username: string, password: string): Promise<number> => {
        try {
            const res = await axios.post(BASE_API_URL + '/register/',
                {username, password},
                {
                    withCredentials: true,
                }
            );
            localStorage.setItem(LocalStorageConsts.UserId, res.data.user_id)
            setIsAuthenticated(true)
            return 201
        } catch (e) {
            setIsAuthenticated(false)
            return 409
        }
    }

    const logout = async () => {
        try {
            await axios.post(BASE_API_URL + '/logout/', {}, {withCredentials: true})
        } catch (e) {
            return
        }
        localStorage.removeItem(LocalStorageConsts.UserId)
        localStorage.removeItem(LocalStorageConsts.Username)
        setIsAuthenticated(false)
        navigate("/login")
    }


    return {login, logout, isAuthenticated, register}
}

export default {AuthConst: LocalStorageConsts, useAuthService};