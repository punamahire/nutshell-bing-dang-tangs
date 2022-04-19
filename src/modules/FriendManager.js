const URL = "http://localhost:8088"

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//


//-----------------------------------------RETRIEVES A LIST OF ALL FRIENDS FROM THE API--------------------------------------------------//

export const getAllFriends = () => {
  return fetch (`${URL}/friends`)
    .then(response => response.json())
}

//-----------------------------------------RETRIEVES A LIST OF FRIENDS OF THE ACTIVE USER FROM THE API--------------------------------------------------//

export const getFriendsOfActiveUser = (userId) => {
  return fetch (`${URL}/friends?userId=${userId}`)
    .then(response => response.json())
}

//-----------------------------------------RETRIEVES A LIST OF ALL USERS FROM THE API--------------------------------------------------//

export const getAllUsers = () => {
  return fetch (`${URL}/users`)
    .then(response => response.json())
}


//------------------------------------------------RETRIEVES A USER BY THEIR ID----------------------------------------------------------//

export const getUserById = (userId) => {
  //be sure your animals have good data and related to a location and customer
  return fetch(`${URL}/users/${userId}`)
  .then(res => res.json())
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