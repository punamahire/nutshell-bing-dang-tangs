const URL = "http://localhost:8088"

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//


//-----------------------------------------RETRIEVES A LIST OF ALL FRIENDS FROM THE API--------------------------------------------------//

export const getAllFriends = () => {
  return fetch (`${URL}/friends`)
    .then(response => response.json())
}


//--------------------------------------ADDS AN OBJECT TO THE FRIENDS ARRAY THROUGH THE API-----------------------------------------------//

export const addFriend = (newFriend) => {
  return fetch (`${URL}/friends`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newFriend)
  }).then(response => response.json())
}


//--------------------------------------TARGETS AN OBJECT IN THE FRIENDS ARRAY AND DELETES IT----------------------------------------------//

export const deleteFriend = id => {
  return fetch(`${URL}/friends/${id}`, {
    method: "DELETE"
  }).then(result => result.json())
}