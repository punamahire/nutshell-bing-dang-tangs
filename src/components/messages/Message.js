import { Fragment, useEffect, useState } from "react";
import { Col, Button, Card } from "react-bootstrap"
import { UpdateMessage } from "../../modules/MessageManager";
import "./Message.css"
import { MessageEdit } from "./MessageEdit";

export const Message = ({ messageObj, user, handleDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [messageClass, setMessageClass] = useState("");
    const [messageTitle, setMessageTitle] = useState("");
    const [messageText, setMessageText] = useState(messageObj.text);
    const [isOwnMessage, setIsOwnMessage] = useState(messageObj.user.id === user.id);
    const [isPrivateMessage, setIsPrivateMessage] = useState(messageObj.isPrivate);
    const [privateMessageRecipient, setPrivateMessageRecipient] = useState("");
    const [message, setMessage] = useState(messageObj);

    const deleteWrapper = (messageId) => {
        setIsDeleting(true);
        handleDelete(messageId);
    }

    const handleEditMessage = () => {
        setIsEditable(true);
    }

    const cancelEdit = () => {
        setIsEditable(false)
    }

    const saveEdit = (messageText) => {
        let tmp = { ...message }
        if (isPrivateMessage) {
            tmp.text = `@${privateMessageRecipient} ${messageText}`
        } else {
            tmp.text = messageText;
        }
        setMessage(tmp)
        // Update database
        UpdateMessage(tmp)
        .then(response => {
            setMessage(response)
            setIsEditable(false)
        }); // Should set current message to updated value and rerender
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
            // Message is a plain message with no @symbol so no need to filter message text
            setMessageText(messageObj.text)
        }
    }, [])

    // Set the element class
    useEffect(() => {
        let tmp = "w-100 message"
        if (isOwnMessage) {
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
            <Col xs={isOwnMessage ? { span: 11, offset: 1 } : { span: 11 }}>
                <Card
                    className={messageClass}
                >
                    <Card.Body>
                        <Card.Subtitle>{messageTitle}</Card.Subtitle>
                        <br></br>
                        {isPrivateMessage && isOwnMessage && <Fragment><Card.Subtitle>Private Message to {privateMessageRecipient}</Card.Subtitle><br></br></Fragment>}
                        {!isEditable && <Card.Text>{messageText}</Card.Text>}
                        {isEditable && 
                            <MessageEdit 
                                setMessage={setMessage}
                                messageText={messageText}
                                saveEdit={saveEdit}
                                cancelEdit={cancelEdit}>
                            </MessageEdit>
                        }

                    </Card.Body>
                    {isOwnMessage &&
                        <Fragment>
                            <Button
                                className="align-self-end"
                                disabled={isEditable}
                                onClick={handleEditMessage}>
                                Edit
                            </Button>
                            <Button
                                className="align-self-end btn-danger"
                                disabled={isDeleting}
                                onClick={() => deleteWrapper(messageObj.id)}>
                                Delete
                            </Button>
                        </Fragment>
                    }
                </Card>
            </Col>
        </>
    )
}