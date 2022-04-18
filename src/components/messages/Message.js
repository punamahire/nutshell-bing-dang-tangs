import { Fragment, useEffect, useState } from "react";
import { Col, Button, Card } from "react-bootstrap"
import "./Message.css"

export const Message = ({ messageObj, user, handleDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [messageClass, setMessageClass] = useState("");
    const [messageTitle, setMessageTitle] = useState("");
    const [messageText, setMessageText] = useState(messageObj.text);
    const [isOwnMessage, setIsOwnMessage] = useState(messageObj.user.id === user.id);
    const [isPrivateMessage, setIsPrivateMessage] = useState(messageObj.isPrivate);
    const [privateMessageRecipient, setPrivateMessageRecipient] = useState("");

    const deleteWrapper = (messageId) => {
        setIsDeleting(true);
        handleDelete(messageId);
    }

    // Format the title
    useEffect(() => {
        if (isPrivateMessage && !isOwnMessage) {
            setMessageTitle(`Private message from ${messageObj.user.name}`);
        } else {
            setMessageTitle(messageObj.user.name);
        }
    }, [])

    // Format the message body
    useEffect(() => {
        if (isPrivateMessage) {
            // Private messages contain @ symbols, so we want to remove those from message text
            let tmp = messageObj.text.split(' ');
            let mRecipient = [tmp[0].slice(1, tmp[0].length), tmp.slice(1, 2)[0]].join(' ')
            let mText = tmp.slice(2, tmp.length).join(' ') // Text without @friendname
            setMessageText(mText)
            if (isOwnMessage) {
                setPrivateMessageRecipient(mRecipient);
            }
        } else {
            // Is a plain message with no @symbol so no need to filter message text
            setMessageText(messageObj.text)
        }
    }, [])

    // Set the element class
    useEffect(() => {
        let tmp = "w-100 message"
        if (isOwnMessage){
            tmp += " user";
        } else {
            if (isPrivateMessage) {
                tmp += " private";
            } else {
                tmp += " other";
            }
        }
        setMessageClass(tmp);
    }, [])

    return (
        <>
            <Col xs={isOwnMessage ? {span: 11, offset: 1} : {span: 11}}>
                <Card
                    className={messageClass}
                >
                    <Card.Body>
                        <Card.Subtitle>{messageTitle}</Card.Subtitle>
                        <br></br>
                        {isPrivateMessage && isOwnMessage && <Fragment><Card.Subtitle>Private Message to {privateMessageRecipient}</Card.Subtitle><br></br></Fragment>}
                        <Card.Text>{messageText}</Card.Text>
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