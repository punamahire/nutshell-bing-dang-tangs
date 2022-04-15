import React, { useReducer } from "react"
import "./Event.css"
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Weather } from "./Weather";

export const EventCard = ({ singleEvent, handleDeleteEvent }) => {

    const [value, toggleValue] = useReducer(previous => !previous, false)

    const isEventExpired = () => {
        if (new Date(singleEvent.date) < new Date()) {
            return false
        }
        return true
    }

    return (
     <Container>
      <div className="card">
        <div className="card-content">
          {/* <picture>
              <img className="card-img" src={`./images/puppy_${singleEvent.id}.png`} alt="My Dog" />
          </picture> */}
          <h3>Name: <span className="card-eventname">
            {singleEvent.name}
          </span></h3>
          <p>Date: {new Date(singleEvent.date).toDateString()} @ {new Date(singleEvent.date).toLocaleTimeString()} </p>
          <p>Location: {singleEvent.location}</p>

          {isEventExpired() &&
            <Link to={`/events/${singleEvent.id}/edit`}>
                <Button>Edit</Button> &nbsp;
            </Link>
          } 
          <Button type="button" onClick={() => handleDeleteEvent(singleEvent.id)}>Delete</Button> &nbsp;
          {isEventExpired() &&
              <Button type="button" onClick={() => toggleValue()}>Show Weather</Button>
          }
          {
                value && <Weather location={singleEvent.location} date={singleEvent.date} /> 
          }
        </div>
      </div>
      </Container>
    );
}