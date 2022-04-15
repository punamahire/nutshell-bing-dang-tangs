import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getEventById, updateEvent } from "../../modules/EventManager";
import { Container, Form, Button } from "react-bootstrap"
import "./EventAddEditForm.css"


export const EventEditForm = () => {
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {eventId} = useParams();
  const navigate = useNavigate();

  const handleFieldChange = evt => {
    const stateToChange = { ...event };
    stateToChange[evt.target.id] = evt.target.value;
    setEvent(stateToChange);
  };

  const updateExistingEvent = evt => {
    evt.preventDefault()
    setIsLoading(true);

    // get the userId from the current session 
    const tempUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    console.log("object from session and userId:", tempUser, tempUser.id)

    const editedEvent = {
      id: eventId,
      name: event.name,
      date: event.date,
      location: event.location,
	  userId: tempUser.id
    };

  //pass the editedEvent object to the database
  updateEvent(editedEvent)
    .then(() => navigate("/events")
    )
  }

  useEffect(() => {
    getEventById(eventId)
      .then(event => {
        setEvent(event);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
    <Container>
      <Form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={event.name}
            />
            <label htmlFor="name">Event name</label>

            <input
              type="date"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="date"
              value={event.date}
            />
            <label htmlFor="date">Date</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="location"
              value={event.location}
            />
            <label htmlFor="location">Location</label>
          </div>
          {/* Be sure to include the userId. Get it from session */}
          <div className="alignRight">
            <Button
              type="button" disabled={isLoading}
              onClick={updateExistingEvent}
              className="btn btn-primary"
            >Submit</Button>
          </div>
        </fieldset>
      </Form>
      </Container>
    </>
  );
}
