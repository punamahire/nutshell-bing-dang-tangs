import React, { useReducer } from "react"
import "./Event.css"
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Weather } from "./Weather";
import { getWeatherData } from '../../modules/EventManager';

export const EventCard = ({ singleEvent, handleDeleteEvent }) => {

    const [value, toggleValue] = useReducer(previous => !previous, false)

    const isEventEditable = () => {
        if (new Date(singleEvent.date + ' 00:00:00') < new Date()) {
            return false
        }
        return true
    }

    return (
     <Container>
      <li className="card">
        <div className="card-content">
          {/* <picture>
              <img className="card-img" src={`./images/puppy_${singleEvent.id}.png`} alt="My Dog" />
          </picture> */}
          <h3>Name: <span className="card-eventname">
            {singleEvent.name}
          </span></h3>
          <p>Date: {singleEvent.date}</p>
          <p>Location: {singleEvent.location}</p>

          {isEventEditable() &&
            <Link to={`/events/${singleEvent.id}/edit`}>
                <Button>Edit</Button> &nbsp;
            </Link>
          } 
          <Button type="button" onClick={() => handleDeleteEvent(singleEvent.id)}>Delete</Button> &nbsp;
          {isEventEditable() &&
              <Button type="button" onClick={() => toggleValue()}>Show Weather</Button>
          }
          {
                value && <Weather location={singleEvent.location} date={singleEvent.date} /> 
          }
        </div>
      </li>
      </Container>
    );
}