import { Message } from "./Message";
import { Container, Row } from "react-bootstrap";
import { Fragment } from "react";

export const MessageList = ({ handleDelete, user, messages }) => {
    return (
        <Container>
            {messages.map(element => {
                return (
                    <Fragment key={element.id}>
                        <Row>
                            <Message messageObj={element} user={user} handleDelete={handleDelete} />
                        </Row>
                        <br></br>
                    </Fragment>
                )
            })}
        </Container>
    )
}