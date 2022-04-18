import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getEventById, updateEvent } from "../../modules/EventManager";
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
      <form className="eventForm">
        <h2>Edit Event</h2>
        <fieldset>
          <div className="formgrid">
          <div className="form-group">
            <label htmlFor="name">Event name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={event.name}
            />     
          </div>       

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="datetime-local"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="date"
              value={event.date}
            />
          </div>
            
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="location"
              value={event.location}
            />
          </div>
            
          </div>
          {/* Be sure to include the userId. Get it from session */}
          <div className="eventEditFormButtons">
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingEvent}
              className="btn btn-primary"
            >Submit</button> 
            <button 
              type="button"
              className="btn btn-primary"
              onClick={() => {navigate("/events")}}>
              Cancel
            </button>
          </div>

        </fieldset>
      </form>
    </>
  );
}
