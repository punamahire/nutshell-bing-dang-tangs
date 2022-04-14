import React from "react";
import { Link } from "react-router-dom";

export const FriendCard = ({friend, callDeleteFriend}) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2>{friend.name}</h2>
        <p>{friend.email}</p>
        <button type="button" className="btn btn-primary" onClick={() => callDeleteFriend(friend.id)}>Unfriend</button>
      </div>
    </div>
  )
}