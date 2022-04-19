import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Friends.css";
import { FriendCard } from "./FriendCard";
import { getAllFriends, deleteFriend } from "../../modules/FriendManager";

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const Friends = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

  let tmp = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUser = tmp.id;


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//---------------------------------------------------SET EMPTY FRIENDS ARRAY-------------------------------------------------------------//

  const [friends, setFriends] = useState([])


  const filterFriends = (friends) => {
    const filtered = friends.filter(friend => friend.userId === currentUser)
    return (filtered)
  }

  

//-----------------------------------POPULATE EMPTY FRIENDS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

  const getFriends = () => {
    //Pull Friends array from API...
    return getAllFriends().then(allFriends => {
      //...then populate empty friends array with what comes back.
      const filtered = filterFriends(allFriends)
      setFriends(filtered)
    })
  }


//------------------------------------------RUN getFriends FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
  getFriends()
}, [])

//--------------------------------------------CALLS THE deleteFriend FUNCTION-------------------------------------------------------------//

const callDeleteFriend = (id) => {
  deleteFriend(id)
  .then(() => getFriends())
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