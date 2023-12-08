import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useMemberServiceFromContext} from "../context/MemberContext.tsx";

interface Props {
    children: React.ReactNode
}

const MembershipCheck: FC<Props> = ({children}) => {

    const {isMember, isUserMember} = useMemberServiceFromContext()
    const {serverId} = useParams()

    useEffect(() => {

        const checkMembership = async (): Promise<void> => {
            try {
                await isMember(parseInt(serverId!))

                console.log(`Membership checked${String(isUserMember)}`)
            } catch (e) {
                console.log(e)
            }
        }
        checkMembership();
        // .then(() => console.log(`Membership checked${String(isUserMember)}`))

    }, [serverId]);

    return (
        <>
            {children}
        </>
    );
};

export default MembershipCheck;