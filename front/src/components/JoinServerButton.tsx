import {useParams} from "react-router-dom";
import {useMemberServiceFromContext} from "../context/MemberContext.tsx";

const JoinServerButton = () => {

    const {joinServer, leaveServer, isUserMember, isLoading} = useMemberServiceFromContext()
    const {serverId} = useParams()

    const tryJoinServer = async () => {
        try {
            await joinServer(parseInt(serverId!))
        } catch (e) {
            console.log(e)
        }
    }

    const tryLeaveServer = async () => {
        try {
            const status = await leaveServer(parseInt(serverId!))
            console.log(status)
        } catch (e) {
            console.log(e)
        }
    }

    if (isLoading) return (<div>Loading...</div>)

    // if (error) { // @ts-ignore
    //     return (<div>{error!.response!.data!.error}</div>)
    // }


    return (
        <div>
            {isUserMember ? (
                <button onClick={tryLeaveServer}>Leave Server</button>
            ) : (
                <button onClick={tryJoinServer}>Join Server</button>
            )}
        </div>
    );
};

export default JoinServerButton;