import { MessageList } from "./MessageList"
import { NewMessage } from "./NewMessage"
import { useState, useEffect } from "react"
import { GetAllMessages } from "../../modules/MessageManager";

export const Messages = () => {
    const [messages, setMessages] = useState([]);

    const getMessages = () => {
        return GetAllMessages()
            .then(m => {
                setMessages(m);
            })
    }

    useEffect(() => {
        getMessages();
    }, [])

    return (
        <>
            <NewMessage getMessages={getMessages} />
            <MessageList messages={messages}/>
        </>
    )
}