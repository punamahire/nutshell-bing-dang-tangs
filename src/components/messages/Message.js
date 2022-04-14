import { Container } from "react-bootstrap"

export const Message = ({ messageObj }) => {

    return (
        <>
            <Container>
                <p>User: {messageObj.senderId} Text: {messageObj.text}</p>
            </Container>
        </>
    )
}