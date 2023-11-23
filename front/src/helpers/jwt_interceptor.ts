import axios, {AxiosInstance} from "axios";
import {BASE_API_URL} from "../config.ts";
import {useNavigate} from "react-router-dom";

const useAxios = (): AxiosInstance => {
    const jwtAxios = axios.create({
        baseURL: BASE_API_URL,
    })
    const navigate = useNavigate()


    jwtAxios.interceptors.response.use(
        res => res,
        error => {
            console.log(error.response)
            if (error.response.status === 403) {
                navigate("/error")
            }
            return Promise.reject(error)
        }
    )
    return jwtAxios
}

export default useAxios;