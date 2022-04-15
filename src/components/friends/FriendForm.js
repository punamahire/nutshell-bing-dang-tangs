import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { addFriend, getAllUsers, getAllFriends } from "./FriendManager"
import "./FriendForm.css";


//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const FriendForm = () => {


//------------------------------------------SAVE THE CURRENT USER'S ID AS A VARIABLE------------------------------------------------------//	

  let currentUser = parseInt(sessionStorage.getItem("nutshell_user", JSON.stringify()))


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//

  const navigate = useNavigate()


//----------------------------------SET FRIENDS USERS AND CURRENT FRIENDS ARRAYS WITH EMPTY KEYS------------------------------------------//

  const [friend, setFriend] = useState({
    name: "",
    email: "",
    userId: currentUser
  })

	const [users, setUsers] = useState({})

	const [currentFriends, setCurrentFriends] = useState({})


//-----------------------------------------POPULATE THE USERS ARRAY WITH USERS FROM THE API------------------------------------------------//

	useEffect(() => {
    getAllUsers()
    .then(users => {
      setUsers(users)});
  }, []);


//-----------------------------------------POPULATE THE CURRENT FRIENDS ARRAY WITH FRIENDS FROM THE API---------------------------------------//	

	const filterFriends = (friends) => {
		const filtered = friends.filter(friend => friend.userId === currentUser)
		return(filtered)
	}

	const getFriends = () => {
    //Pull Friends array from API...
    return getAllFriends().then(allFriends => {
      //...then populate empty friends array with what comes back.
      const filtered = filterFriends(allFriends)
			console.log(filtered)
      setCurrentFriends(filtered)
    })
  }

	useEffect(() => {
    getFriends()
  }, []);

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
		//Saves friend name and email in variables
		const friendName = friend.name
		const friendEmail = friend.email
		//Checks the users array for the current entry and saves it as a variable
		const isUser = (users.find(users => users.email === friendEmail))
		const isFriend = (currentFriends.find(friend => friend.email === friendEmail))
    //Display error message if input fields are left empty
		if (friendName === "" || friendEmail === "") {
			window.alert("Please input a valid name and email address")
		//Display error message if new friend is already on your friends list
		}	else if (isFriend != undefined) {
				if (friendName === isFriend.name && friendEmail === isFriend.email) { 
					window.alert("This person is already your friend")
				}
				//...or if they do not exist
				else {
					window.alert("Please input a valid name and email address")
				}
		//Check to see if the added friend is a User 
		} else if (friendName === isUser.name && friendEmail === isUser.email) {
			//Invoke addFriend passing friend as an argument
			//Navigate back to friends page
			addFriend(friend)
				.then(() => navigate("/friends"))
		//Display error message if new friend does not exist
			} else {
			window.alert("Please input a valid name and email address")
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