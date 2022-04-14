import { Message } from "./Message";

export const MessageList = ({ messages }) => {
    return (
        <>
            {messages.map(element => {
                return <Message key={element.id} messageObj={element} />
            })}
        </>
    )
}