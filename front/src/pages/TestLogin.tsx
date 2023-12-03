import {useAuthServiceContext} from "../context/AuthServiceProvider.tsx";
import {useState} from "react";
import {BASE_API_URL} from "../config.ts";
import {AxiosError} from "axios";
import useAxios from "../helpers/AxiosHelper.ts";


const TestLogin = () => {

    const authServiceContext = useAuthServiceContext()
    const [username, setUsername] = useState("")
    const axios = useAxios()

    const getUserName = async (): Promise<string | Error> => {
        try {
            const response = await axios.get(
                BASE_API_URL + `/account?user_id=1`,
            );
            setUsername(response.data.username)
            return username;
        } catch (e) {
            return (e as AxiosError);
        }
    }

    return (
        <div>
            {authServiceContext.isAuthenticated ? "true" : "false"}
            <button onClick={authServiceContext.logout}>logout</button>
            <button onClick={getUserName}>get user name</button>

            <div>
                {username}
            </div>
        </div>
    );
};

export default TestLogin;