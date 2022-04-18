const URL = "http://localhost:8088"

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//


//-----------------------------------------RETRIEVES A LIST OF ALL TASKS FROM THE API--------------------------------------------------//

export const getAllTasks = () => {
  return fetch (`${URL}/tasks`)
    .then(response => response.json())
}

//------------------------------------------------RETRIEVES A TASK BY IT'S ID----------------------------------------------------------//

export const getTaskById = (taskId) => {
  return fetch(`${URL}/tasks/${taskId}`)
  .then(res => res.json())
}


//-----------------------------------------RETRIEVES A LIST OF ALL USERS FROM THE API--------------------------------------------------//

export const getAllUsers = () => {
  return fetch (`${URL}/users`)
    .then(response => response.json())
}


//------------------------------------------------RETRIEVES A USER BY THEIR ID----------------------------------------------------------//

export const getUserById = (userId) => {
  return fetch(`${URL}/users/${userId}`)
  .then(res => res.json())
}

//--------------------------------------ADDS AN OBJECT TO THE TASKS ARRAY THROUGH THE API-----------------------------------------------//

export const addTask = (newFriend) => {
  return fetch (`${URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newFriend)
  }).then(response => response.json())
}


//--------------------------------------TARGETS AN OBJECT IN THE TASK ARRAY AND DELETES IT-----------------------------------------------//

export const deleteTask = id => {
  return fetch(`${URL}/tasks/${id}`, {
    method: "DELETE"
  }).then(result => result.json())
}


//--------------------------------------------------------UPDATES A TASK----------------------------------------------------------------//

export const updateTask  = (editedTask) => {
	return fetch(`${URL}/tasks/${editedTask.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(editedTask)
	}).then(data => data.json());
}