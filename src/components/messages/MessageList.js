import { Message } from "./Message";
import { Container, Row } from "react-bootstrap";
import "./MessageList.css"

export const MessageList = ({ handleDelete, user, messages }) => {
    return (
        <>
            <Container key="messageList">
                {messages.map(element => {
                    return (
                        <Row key={element.id} className={element.user.id === user.id ? `justify-content-end` : ``}>
                            <Message messageObj={element} user={user} handleDelete={handleDelete} />
                        </Row>
                    )
                })}
            </Container>
        </>
    )
}