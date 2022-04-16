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
                className={`w-75 p-4 m-3 ${isOwnMessage ? `user` : `other`}`}
            >
                <Col>
                    <Card.Body>
                        <Card.Subtitle>{messageObj.user.name}</Card.Subtitle>
                        <br></br>
                        <Card.Text>{messageObj.text}</Card.Text>
                    </Card.Body>

                    {isOwnMessage && <Button disabled={isDeleting} onClick={() => {handleDelete(messageObj.id)}} variant="green" className="btn-danger offset-10">Delete</Button>}

                </Col>
                {/* {isOwnMessage && <Col className="red-column" md={{ span: 6, offset: 10 }}>
                    <Button disabled={isDeleting} onClick={() => {deleteWrapper(messageObj.id)}} className="btn-danger w-25">Delete</Button>
                </Col>} */}
            </Card>
        </>
    )
}