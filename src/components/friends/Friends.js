import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Friends.css";
import { FriendCard } from "./FriendCard";
import { getAllFriends } from "./FriendManager";

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const Friends = () => {


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//---------------------------------------------------SET EMPTY FRIENDS ARRAY------------------------------------------------------------//

  const [friends, setFriends] = useState([])


//-----------------------------------POPULATE EMPTY FRIENDS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

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


 //--------------------------------GENERATE HTML FOR FRIENDS PAGE AND GENERATE FRIEND CARDS------------------------------------------------// 

  return (
    <main>
      <section className="friend-header">
        <h1>Friend List</h1>
        <button type="button" onClick={() => {navigate("/friends/add")}}>Add Friend</button>
      </section>
      <section className="card-container">
        {friends.map(friend =>
          <FriendCard key={friend.id} friend={friend}/>
        )}
      </section>
    </main>
  );
}