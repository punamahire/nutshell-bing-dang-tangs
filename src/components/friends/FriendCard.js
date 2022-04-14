import React from "react";
import { Link } from "react-router-dom";

export const FriendCard = ({friend}) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2>{friend.name}</h2>
        <p>{friend.email}</p>
      </div>
    </div>
  )
}