import { remoteURL } from "./ModuleGlobalValues"

export const GetAllMessages = () => {
    return fetch(`${remoteURL}/messages`)
        .then(response => response.json());
}

export const CreateMessage = (messageObj) => {
    return fetch(`${remoteURL}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageObj)
    })
        .then(response => response.json())
}