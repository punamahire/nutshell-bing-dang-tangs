import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EventCard } from './EventCard';
import { getAllEvents, deleteEvent, getWeatherData } from '../../modules/EventManager';
import { Weather } from "./Weather";

export const EventList = () => {
  
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const getEvents = () => {
    
    return getAllEvents().then(eventsFromAPI => {
      setEvents(eventsFromAPI)
    });
  };

  const handleDeleteEvent = id => {
    deleteEvent(id)
    .then(() => getAllEvents().then(setEvents));
  };


  // got the Events from the API on the component's first render
  useEffect(() => {
    getEvents();
  }, []);

  // Finally we use .map() to "loop over" the Events array to show a list of Event cards
  return (
  <>
    <section className="section-content">
        <Button type="button"
            className="btn"
            onClick={() => {navigate("/events/create")}}>
            Add Event
        </Button>
    </section>
    <ul className="container-cards">
      {events.map(event => 
        <EventCard 
          key={event.id} 
          singleEvent={event} 
          handleDeleteEvent={handleDeleteEvent}
          />
      )}
    </ul>
  </>

  );
}