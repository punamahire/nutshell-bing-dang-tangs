import { remoteURL } from "./ModuleGlobalValues"

export const GetAllMessages = () => {
    return fetch(`${remoteURL}/messages?_expand=user`)
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

export const DeleteMessage = (id) => {
    return fetch(`${remoteURL}/messages/${id}`, {
        method: "DELETE"
    })
        .then(response => response.json())
}

export const UpdateMessage = (messageObj) => {
    return fetch(`${remoteURL}/messages/${messageObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageObj)
    })
        .then(response => response.json())
}