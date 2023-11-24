import {useState} from 'react';
import useWebSocket from "react-use-websocket";
import {useParams} from "react-router-dom";


const MessageInterface = () => {

    const [incomeMessage, setIncomeMessage] = useState<string[]>([])
    const [inputMessage, setInputMessage] = useState("")
    const {serverId, channelId} = useParams()

    const socketUrl = channelId ? `ws://127.0.0.1:8000/ws/${serverId}/${channelId}` : null

    const {sendJsonMessage} = useWebSocket(socketUrl, {
        onOpen: () => console.log("opened ws connection"),
        onError: (event) => console.log("error ws connection", event),
        onClose: (event) => console.log("closed ws connection", event),
        onMessage: (event) => {
            const data = JSON.parse(event.data)
            setIncomeMessage((prev) => [...prev, data.message])
        }
    })

    const send = () => {
        console.log(inputMessage)
        sendJsonMessage({
            type: "message",
            text: inputMessage,
        })
        setInputMessage("")
    }


    return (

        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column"
        }}>

            {incomeMessage.map((message, index) => {
                return (
                    <div key={index}>
                        <p>
                            {message}
                        </p>
                    </div>
                )
            })}


            <form>
                <label>Enter Message: <input
                    type={"text"}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />


                </label>
            </form>
            <button onClick={send}>Send Message</button>

        </div>
    )
        ;
};

export default MessageInterface;