import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { addTask, getAllUsers, getUserById } from "./TaskManager"
import "./TaskForm.css";



//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const TaskForm = () => {


//-------------------------------------SAVE THE CURRENT USER'S ID AND OBJECT AS VARIABLES------------------------------------------------//	

  let currentUser = parseInt(sessionStorage.getItem("nutshell_user", JSON.stringify()))

//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//

  const navigate = useNavigate()


//------------------------SET FRIENDS, USERS, CURRENT FRIENDS, AND CURRENT USER ARRAYS WITH EMPTY KEYS------------------------------------//

  const [task, setTask] = useState({
    name: "",
    description: "",
    userId: currentUser,
  })

	const [currentUserObj, setCurrentUserObj] = useState({})

	const [users, setUsers] = useState({})


//-----------------------------------------POPULATE THE USERS ARRAY WITH USERS FROM THE API------------------------------------------------//

	useEffect(() => {
    getAllUsers()
    .then(users => {
      setUsers(users)});
  }, []);


//------------------------------------POPULATE THE CURRENT USER OBJ ARRAY WITH THE CURRENT USER---------------------------------------------//

	useEffect(() => {
    getUserById(currentUser)
    .then(user => {
      setCurrentUserObj(user)});
  }, []);


//-----------------------------------------RE-RENDER AND DISPLAY VALUES WHEN A FIELD CHANGES-----------------------------------------------//

	const handleControlledInputChange = (event) => {
		//Create a copy of the friend array
		const newTask = { ...task }
    //target the value of the input field
		let selectedVal = event.target.value
		//Change the property of the input field to a new value
		newTask[event.target.id] = selectedVal
		// update state
		setTask(newTask)
	}


//---------------------------------CALL addTask FUNCTION AND NAVIGATE BACK TO FRIEND PAGE ON BUTTON CLICK----------------------------//

  const clickAddTask = (event) => {
		//Prevents the browser from submitting the form
    event.preventDefault()
		//Saves task name and description in variables
		const taskName = task.name
		const taskDescription = task.description
	
    //Display error message if input fields are left empty
		if (taskName === "" || taskDescription === "") {
			window.alert("Please fill in the input fields")

		//Otherwise add Task
		} else {
			//Invoke addTask passing task as an argument
			//Navigate back to tasks page
			addTask(task)
				.then(() => navigate("/tasks"))
			}
	}


//----------------------------------------CANCELS FORM AND NAVIGATES BACK TO FRIEND PAGE------------------------------------------------//

  const ClickCancel = (event) => {
			navigate("/tasks")
		}


//----------------------------------------------GENERATE HTML FOR NEW FRIEND FORM-------------------------------------------------------//

  return (
    <form className="taskForm">
      <h2>Create A New Task</h2>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Title:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Task name" value={task.name} />
				</div>
			</fieldset>
      <fieldset>
				<div className="form-group">
					<label htmlFor="description">Description:</label>
					<input type="text" id="description" onChange={handleControlledInputChange} required className="form-control" placeholder="Task description" value={task.description} />
				</div>
			</fieldset>
      <div className="buttons">
        <button type="button" className="btn btn-primary"
          onClick={clickAddTask}>
          Create Task
            </button>
            <button type="button" className="btn btn-primary"
          onClick={ClickCancel}>
          Cancel
            </button>   
      </div>    
    </form>
  )
}