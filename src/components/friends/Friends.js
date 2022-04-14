import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Friends.css";
import { FriendCard } from "./FriendCard";
import { getAllFriends, deleteFriend } from "./FriendManager";

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const Friends = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

  let currentUser = parseInt(sessionStorage.getItem("nutshell_user", JSON.stringify()))


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//---------------------------------------------------SET EMPTY FRIENDS ARRAY-------------------------------------------------------------//

  const [friends, setFriends] = useState([])


  const filterFriends = (friend) => {
    console.log(friend)
    const filtered = friend.filter(friend.userId = currentUser)
    console.log(filtered)
    return(filtered)
  }

  

//-----------------------------------POPULATE EMPTY FRIENDS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

  // const getFriends = () => {
  //   //Pull Friends array from API...
  //   return getAllFriends().then(allFriends => {
  //     //...then populate empty friends array with what comes back.
  //     filterFriends(allFriends).then(filteredFriends => {
  //       setFriends(filteredFriends)
  //     })
  //   })
  // }

  const getFriends = () => {
    //Pull Friends array from API...
    return getAllFriends().then(allFriends => {
      //...then populate empty friends array with what comes back.
        setFriends(allFriends)
    })
  }


//------------------------------------------RUN getFriends FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
  getFriends()
}, [])

//--------------------------------------------CALLS THE deleteFriend FUNCTION-------------------------------------------------------------//

const callDeleteFriend = (id) => {
  deleteFriend(id)
  .then(() => getAllFriends().then(setFriends));
};


 //--------------------------------GENERATE HTML FOR FRIENDS PAGE AND GENERATE FRIEND CARDS------------------------------------------------// 

  return (
    <main>
      <section className="friend-header">
        <h1>Friend List</h1>
        <button type="button" className="btn btn-primary" onClick={() => {navigate("/friends/add")}}>Add Friend</button>
      </section>
      <section className="card-container">
        {friends.map(friend =>
          <FriendCard key={friend.id} friend={friend} callDeleteFriend={callDeleteFriend}/>
        )}
      </section>
    </main>
  );
}