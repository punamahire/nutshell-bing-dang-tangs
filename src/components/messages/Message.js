import { useState } from "react";
import { Container, Col, Button, Row, Card } from "react-bootstrap"
import "./Message.css"

export const Message = ({ messageObj, user, handleDelete }) => {
    let isOwnMessage = messageObj.user.id === user.id;
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteWrapper = (messageId) =>{
        setIsDeleting(true);
        handleDelete(messageId);
    }

    return (
        <>
            <Card
                className={`w-75 p-4 m-3 
                ${isOwnMessage ? `align-self-end user-message` : `message`}
                `}
            >
                <Row>
                    <Card.Body>
                        <Card.Subtitle>{messageObj.user.name}</Card.Subtitle>
                        <br></br>
                        <Card.Text>{messageObj.text}</Card.Text>
                    </Card.Body>

                </Row>
                {isOwnMessage && <Row className="d-flex flex-row-reverse">
                    <Button disabled={isDeleting} onClick={() => {deleteWrapper(messageObj.id)}} className="btn-danger message-delete-button w-25">Delete</Button>
                </Row>}
            </Card>
        </>
    )
}