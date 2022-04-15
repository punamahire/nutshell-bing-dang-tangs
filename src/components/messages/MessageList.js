import { Message } from "./Message";
import { Container, Col } from "react-bootstrap";
import "./MessageList.css"

export const MessageList = ({ handleDelete, user, messages }) => {
    return (
        <>
            <Container>
                <Col className="d-flex flex-column">
                    {messages.map(element => {
                        return <Message key={element.id} messageObj={element} user={user} handleDelete={handleDelete} />
                    })}
                </Col>
            </Container>
        </>
    )
}