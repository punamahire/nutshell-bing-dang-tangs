import React, { useReducer } from "react"
import { Link } from "react-router-dom";
import { Weather } from "./Weather";
import "./EventCard.css"

export const EventCard = ({ singleEvent, handleDeleteEvent }) => {

    const [value, toggleValue] = useReducer(previous => !previous, false)

    const isEventExpired = () => {
        if (new Date(singleEvent.date) < new Date()) {
            return false
        }
        return true
    }

    return (
      <div className="card">
        <div className="card-content">
          <h3><span className="card-eventname">
            {singleEvent.name}
          </span></h3>
          <p>Date: {new Date(singleEvent.date).toDateString()} @ {new Date(singleEvent.date).toLocaleTimeString()} </p>
          <p>Location: {singleEvent.location}</p>
          <div className="card-buttons-div">
            {isEventExpired() &&
              <Link to={`/events/${singleEvent.id}/edit`}>
                  <button className="card-button btn btn-primary">Edit</button> &nbsp;
              </Link>
            } 
            <button type="button" className="card-button btn btn-primary" onClick={() => handleDeleteEvent(singleEvent.id)}>Delete</button> &nbsp;
            {isEventExpired() &&
                <button type="button" className="card-button btn btn-primary" onClick={() => toggleValue()}>Show Weather</button>
            }
            {
                  value && <Weather location={singleEvent.location} date={singleEvent.date} /> 
            }
          </div>
        </div>
      </div>
    );
}