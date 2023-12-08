import {createContext, ReactNode, useContext} from "react";
import useMembershipService from "../services/MembershipService.ts";
import {AxiosError} from "axios";


export interface MemberContextType {
    joinServer: (serverId: number) => Promise<number>,
    leaveServer: (serverId: number) => Promise<number>,
    isMember: (serverId: number) => Promise<boolean>,
    isUserMember: boolean
    error: Error
    isLoading: boolean
}

const MemberContext = createContext<MemberContextType | null>(null)


export const MemberContextProvider = ({children}: { children: ReactNode }) => {
    const value = useMembershipService()
    return (
        <MemberContext.Provider value={value}>
            {children}
        </MemberContext.Provider>
    )
}

export const useMemberServiceFromContext = () => {
    const context = useContext(MemberContext)
    if (context === null) {
        throw new Error("useMemberContext must be used within a MemberContextProvider")
    }
    return context
}
