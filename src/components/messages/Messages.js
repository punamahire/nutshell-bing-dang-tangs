import { MessageList } from "./MessageList"
import { NewMessage } from "./NewMessage"
import { useState, useEffect } from "react"
import { DeleteMessage, GetAllMessages } from "../../modules/MessageManager";

export const Messages = () => {
    let user = JSON.parse(sessionStorage.getItem("nutshell_user"));
    const [messages, setMessages] = useState([]);

    const getMessages = () => {
        return GetAllMessages()
            .then(m => {
                setMessages(m);
            })
    }

    // Delete message by id then reload the messages
    const handleDelete = (messageId) => {
        return DeleteMessage(messageId)
            .then(getMessages)
    }

    useEffect(() => {
        getMessages();
    }, [])

    return (
        <>
            <NewMessage user={user} getMessages={getMessages} />
            <MessageList user={user} handleDelete={handleDelete} messages={messages}/>
        </>
    )
}