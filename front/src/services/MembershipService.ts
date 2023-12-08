import {MemberContextType} from "../context/MemberContext.tsx";
import useAxios from "../helpers/AxiosHelper.ts";
import {useState} from "react";
import {AxiosError} from "axios";


const useMembershipService = (): MemberContextType => {
    const axios = useAxios()
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isUserMember, setIsUserMember] = useState<boolean>( false)
    const joinServer = async (serverId: number): Promise<number> => {
        try {
            setIsLoading(true)
            const res = await axios.post(`/membership/${serverId}/membership/`,
                {},
                {withCredentials: true}
            )
            setIsLoading(false)
            setIsUserMember(true)
            return res.status
        } catch (e) {
            const er = e as AxiosError
            setIsLoading(false)
            setError(er)
            return er.response?.status as number
        }
    }
    const leaveServer = async (serverId: number): Promise<number> => {
        try {
            setIsLoading(true)
            const res = await axios.delete(`/membership/${serverId}/membership/remove_member/`,
                {withCredentials: true}
            )
            setIsLoading(false)
            setIsUserMember(false)
            return res.status
        } catch (e) {
            const er = e as AxiosError
            setIsLoading(false)
            console.log(er)
            setError(er)
            return er.response?.status as number
        }
    }

    const isMember = async (serverId: number): Promise<boolean> => {
        try {
            setIsLoading(true)
            const res = await axios.get(`/membership/${serverId}/membership/is_member/`,
                {withCredentials: true}
            )
            setIsUserMember(res.data.is_member)
            setIsLoading(false)
            return res.data.is_member
        } catch (e) {
            const er = e as AxiosError<Error>
            setIsLoading(false)
            setError(er)
            return true
        }
    }

    console.log(isUserMember)


    return {error, isLoading, isUserMember, joinServer, leaveServer, isMember}

}


export default useMembershipService