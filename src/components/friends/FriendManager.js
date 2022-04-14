const URL = "http://localhost:8088"

export const getAllFriends = () => {
  return fetch (`${URL}/friends`)
    .then(response => response.json())
}

export const addFriend = (newFriend) => {
  return fetch (`${URL}/friends`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newFriend)
  }).then(response => response.json())
}