import React, { useState, useReducer } from "react"
import { Link } from "react-router-dom";
import { Weather } from "./Weather";
import "./EventCard.css"

export const EventCard = ({ singleEvent, handleDeleteEvent }) => {

    const [value, toggleValue] = useReducer(previous => !previous, false)

    let activeUser = JSON.parse(sessionStorage.getItem("nutshell_user"));

    let tmp = JSON.parse(sessionStorage.getItem("nutshell_user"));
    let currentUserId = tmp.id;
  

    const isEventExpired = () => {
        if (new Date(singleEvent.date) < new Date()) {
            return true
        }
        return false
    }

    return (
      <div className={singleEvent.userId !== activeUser.id ? "styleFriendEventCard" : "styleYourEventCard"}>
        <div className={singleEvent.userId !== activeUser.id ? "styleFriendEvent" : ""}>
          {currentUserId === singleEvent.userId
              ? <p><i>your event</i></p>

              : <p><i>{singleEvent.user.name}</i></p>
            } 
          <h3><span className="card-eventname">
            {singleEvent.name}
          </span></h3>
          <p>Date: {new Date(singleEvent.date).toDateString()} @ {new Date(singleEvent.date).toLocaleTimeString()} </p>
          <p>Location: {singleEvent.location}</p>
          <div className="card-buttons-div">
            {(!isEventExpired() && (activeUser.id === singleEvent.userId)) &&
              <Link to={`/events/${singleEvent.id}/edit`}>
                  <button className="card-button btn btn-primary">Edit</button> 
              </Link>
            } 
            {(activeUser.id === singleEvent.userId) &&
            <button type="button" className="card-button btn btn-primary" onClick={() => handleDeleteEvent(singleEvent.id)}>Delete</button> 
            }
            {!isEventExpired() &&
                <button type="button" className="card-button btn btn-primary" onClick={() => toggleValue()}>Show Weather</button>
            }
          </div>
          {
                  value && <Weather location={singleEvent.location} date={singleEvent.date} /> 
          }
        </div>
      </div>
    );
}