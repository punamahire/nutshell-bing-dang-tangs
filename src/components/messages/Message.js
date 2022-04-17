import { useState } from "react";
import { Col, Button, Card } from "react-bootstrap"
import "./Message.css"

export const Message = ({ messageObj, user, handleDelete }) => {
    let isOwnMessage = messageObj.user.id === user.id;
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteWrapper = (messageId) => {
        setIsDeleting(true);
        handleDelete(messageId);
    }

    return (
        <>
            <Col xs={isOwnMessage ? {span: 11, offset: 1} : {span: 11}}>
                <Card
                    className={`${isOwnMessage ? `user` : `other`} w-100 message`}
                >
                    <Card.Body>
                        <Card.Subtitle>{messageObj.user.name}</Card.Subtitle>
                        <br></br>
                        <Card.Text>{messageObj.text}</Card.Text>
                    </Card.Body>
                    {isOwnMessage &&
                        <Button
                            className="align-self-end btn-danger"
                            onClick={() => deleteWrapper(messageObj.id)}
                        >Delete
                        </Button>
                    }
                </Card>
            </Col>
        </>
    )
}