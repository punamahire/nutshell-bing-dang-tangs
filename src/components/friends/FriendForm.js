import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { addFriend } from "./FriendManager"
import "./FriendForm.css";


//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const FriendForm = () => {

  let currentUser = parseInt(sessionStorage.getItem("nutshell_user", JSON.stringify()))
//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//

  const navigate = useNavigate()


//----------------------------------------------SET FRIENDS ARRAY WITH EMPTY KEYS--------------------------------------------------------//

  const [friend, setFriend] = useState({
    name: "",
    email: "",
    userId: currentUser
  })


//-----------------------------------------RE-RENDER AND DISPLAY VALUES WHEN A FIELD CHANGES-----------------------------------------------//

	const handleControlledInputChange = (event) => {
		//Create a copy of the friend array
		const newFriend = { ...friend }
    //target the value of the input field
		let selectedVal = event.target.value
		//convert the id value of the object in the input field to a string
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)}
		//Change the property of the input field to a new value
		newFriend[event.target.id] = selectedVal
		// update state
		setFriend(newFriend)
	}


//---------------------------------CALL addFriend FUNCTION AND NAVIGATE BACK TO FRIEND PAGE ON BUTTON CLICK----------------------------//

  const ClickAddFriend = (event) => {
		//Prevents the browser from submitting the form
    event.preventDefault()
    //Display error message if input fields are left empty
		if (friend.name === "" || friend.email === "") {
			window.alert("Please input a name and email address")
		} else {
			//Invoke addFriend passing friend as an argument
			//Navigate back to friends page
			addFriend(friend)
				.then(() => navigate("/friends"))
		}
	}


//----------------------------------------CANCELS FORM AND NAVIGATES BACK TO FRIEND PAGE------------------------------------------------//

  const ClickCancel = (event) => {
			navigate("/friends")
		}


//----------------------------------------------GENERATE HTML FOR NEW FRIEND FORM-------------------------------------------------------//

  return (
    <form className="friendForm">
      <h2>New Friend</h2>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Friend Name:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Friend name" value={friend.name} />
				</div>
			</fieldset>
      <fieldset>
				<div className="form-group">
					<label htmlFor="email">Friend Email:</label>
					<input type="text" id="email" onChange={handleControlledInputChange} required className="form-control" placeholder="Friend email" value={friend.email} />
				</div>
			</fieldset>
      <div className="buttons">
        <button type="button" className="btn btn-primary"
          onClick={ClickAddFriend}>
          Add Friend
            </button>
            <button type="button" className="btn btn-primary"
          onClick={ClickCancel}>
          Cancel
            </button>   
      </div>    
    </form>
  )
}