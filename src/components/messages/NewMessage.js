import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Container, Row, Col } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import { getFriendsOfActiveUser } from "../../modules/FriendManager"
import { CreateMessage } from "../../modules/MessageManager"
import "./NewMessage.css"

export const NewMessage = ({ getMessages, user }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [friendsList, setFriendsList] = useState([]);

    // Load friends list for currently logged in user
    useEffect(() => {
        getFriendsOfActiveUser(user.id)
            .then((friends) => {
                setFriendsList(friends);
            })
    }, [])

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
        const isPrivateMessage = () => {
            let tMessage = { ...message } // Copy state into new variable
            let messageArray = tMessage.text.split(' '); // Parse message words into an array
            let firstLetterOfMessage = messageArray[0].split('')[0];

            if (firstLetterOfMessage === '@') {
                //Because user friends are "Firstname Lastname" we need to grab second word of the message because it should be the friend's lastname
                let friendName = [messageArray[0].split("@")[1], messageArray[1]].join(' ');
                // If recipient exists in friend list
                let usersFriend = friendsList.find(friend => friend.name === friendName);
                if (usersFriend) {
                    // Create Private Message
                    return [true, usersFriend.theirId];
                } else {
                    // Display error text
                    window.alert(`Invalid friend name`);
                }
            }
            return [false, 0];
        }

        e.preventDefault();
        setIsLoading(true);


        let messageObj = { ...message };
        [messageObj["isPrivate"], messageObj["receiverId"]] = isPrivateMessage();
        
        CreateMessage(messageObj)
            .then((res) => {
                getMessages()
                    .then(() => {
                        setIsLoading(false);
                    })
            })

        setMessage({
            text: "",
            receiverId: 0,
            userId: user.id,
            timestamp: new Date().toISOString(),
            isPrivate: false
        })
    }

    return (
        <>
            <Container key="newMessage" className="new-message-container">
                <Row>
                    <Col xs={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }} xxl={{ span: 8, offset: 2 }}>
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
                    </Col>
                </Row>
            </Container>
        </>
    )
}