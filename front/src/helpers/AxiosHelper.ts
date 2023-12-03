import axios, {AxiosError, AxiosInstance} from "axios";
import {BASE_API_URL} from "../config.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useAuthService} from "../services/AuthService.ts";


export const refreshToken = async (navigate: NavigateFunction, logout: () => void): Promise<number> => {
    try {
        const res = await axios.post(BASE_API_URL + '/token/refresh/',
            {},
            {withCredentials: true}
        );
        return res.status
    } catch (e) {
        console.log(e)
        logout()
        navigate("/login")
        return 401
    }
}

const useAxios = (): AxiosInstance => {
    const jwtAxios = axios.create({
        baseURL: BASE_API_URL,
    })
    const navigate = useNavigate()
    const {logout} = useAuthService()


    jwtAxios.interceptors.response.use(
        res => {
            return res
        },
        async (error: AxiosError) => {
            if (error.response?.status === 401) {
                const res = await refreshToken(navigate, logout)
                if (res === 200) {
                    const originalRequest = error.config!
                    return await jwtAxios(originalRequest)
                }
            }
            if (error.response?.status === 403) {
                navigate("/error")
            }
            return Promise.reject(error)

        }
    )

    jwtAxios.interceptors.request.use(
        res => {
            res.withCredentials = true
            return res
        },
    )


    return jwtAxios
}

export default useAxios;