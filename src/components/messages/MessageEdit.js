import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap"


export const MessageEdit = ({ messageText, saveEdit, cancelEdit }) => {
    const [text, setText] = useState(messageText);
    const [textAreaHeight, setTextAreaHeight] = useState();
    const tAreaRef = useRef();

    useEffect(() => {
        setTextAreaHeight(tAreaRef.current.scrollHeight);
    }, [])

    const textAreaStyle = {
        height: `${textAreaHeight}px`
    }

    const editOnChange = (e) => {
        setText(e.target.value);;
        if (tAreaRef.current.scrollHeight > textAreaHeight) {
            setTextAreaHeight(tAreaRef.current.scrollHeight);
        }
    }

    return (
        <>

            <textarea ref={tAreaRef} style={textAreaStyle} onChange={editOnChange} className="w-100" value={text}></textarea>
            <Button className="btn-success" onClick={() => saveEdit(text)}>Save</Button>{' '}
            <Button onClick={cancelEdit}>Cancel</Button>
        </>
    )
}