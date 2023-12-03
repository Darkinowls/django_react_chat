import {createContext, FC, ReactNode, useContext} from "react";
import {useAuthService} from "../services/AuthService.ts";
import {AuthServiceProps} from "../@types/auth-service";


const AuthContext = createContext<AuthServiceProps | null>(null);


type Props = {
    children: ReactNode
};

export const AuthServiceProvider: FC<Props> = ({children}) => {

    const authService = useAuthService()

    return (
        <AuthContext.Provider value={authService}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthServiceContext = (): AuthServiceProps => {
    const authService = useContext(AuthContext)
    if (authService === null) {
        throw new Error("Auth service context is null")
    }
    return authService
};
