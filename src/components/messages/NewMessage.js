import { useState } from "react"
import { Button } from "react-bootstrap"
import { Container } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import { CreateMessage } from "../../modules/MessageManager"
import "./NewMessage.css"

export const NewMessage = ({getMessages, user}) => {
    
    const [isLoading, setIsLoading] = useState(false);

    const [message, setMessage] = useState({
        text: "",
        receiverId: 0,
        userId: user.id,
        timestamp: new Date().toISOString(),
        isPrivate: false
    })

    const handleFieldChange = (e) => {
        let tmp = { ...message };
        tmp[e.target.id] = e.target.value;
        setMessage(tmp);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let messageObj = { ...message };
        setMessage({
            text: "",
            receiverId: 0,
            userId: user.id,
            timestamp: new Date().toISOString(),
            isPrivate: false
        })
        CreateMessage(messageObj)
            .then((res) => {
                getMessages()
                    .then(() => {
                        setIsLoading(false);
                    })
            })
    }

    return (
        <>
            <Container key="newMessage" className="new-message-container">
                <Form onSubmit={handleSubmit}>
                    <h2>New Message</h2>
                    <Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            id="text"
                            onChange={handleFieldChange}
                            required
                            as="textarea"
                            value={message.text}
                        ></Form.Control>
                    </Form.Group>
                    <br></br>
                    <Button disabled={isLoading} variant="primary" type="submit">Submit</Button>{' '}
                    <Button disabled={isLoading} variant="secondary">Cancel</Button>
                </Form>
            </Container>
        </>
    )
}