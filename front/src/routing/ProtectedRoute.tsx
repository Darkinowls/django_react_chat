import React from 'react';
import {useAuthServiceContext} from "../context/AuthServiceProvider.tsx";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
    const {isAuthenticated} = useAuthServiceContext()
    console.log(isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to={'/login'} replace={true} />
    }
    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;