import React, { useReducer } from "react"
import { Container, Button } from "react-bootstrap";
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
          {/* <picture>
              <img className="card-img" src={`./images/puppy_${singleEvent.id}.png`} alt="My Dog" />
          </picture> */}
          <h3><span className="card-eventname">
            {singleEvent.name}
          </span></h3>
          <p>Date: {new Date(singleEvent.date).toDateString()} @ {new Date(singleEvent.date).toLocaleTimeString()} </p>
          <p>Location: {singleEvent.location}</p>
          <div className="card-buttons-div">
            {isEventExpired() &&
              <Link to={`/events/${singleEvent.id}/edit`}>
                  <Button className="card-button">Edit</Button> &nbsp;
              </Link>
            } 
            <Button type="button" className="card-button" onClick={() => handleDeleteEvent(singleEvent.id)}>Delete</Button> &nbsp;
            {isEventExpired() &&
                <Button type="button" className="card-button" onClick={() => toggleValue()}>Show Weather</Button>
            }
            {
                  value && <Weather location={singleEvent.location} date={singleEvent.date} /> 
            }
          </div>
        </div>
      </div>
    );
}