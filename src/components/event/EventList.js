import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EventCard } from './EventCard';
import { getAllEvents, deleteEvent } from '../../modules/EventManager';
import "./EventCard.css"

export const EventList = () => {
  
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const getEvents = () => {
    
    let expiredEvents = []
    let upcomingEvents = []
    let eventsInOrder = []
    return getAllEvents().then(eventsFromAPI => {

        // move the expired events to the bottom of the list
        // before updating the component's state
        expiredEvents = eventsFromAPI.filter(evt => {
            return ((new Date(evt.date) < new Date()))
        })

        upcomingEvents = eventsFromAPI.filter(evt => {
            return ((new Date(evt.date) >= new Date()))
        })

        upcomingEvents.map(evt => {
            eventsInOrder.push(evt)
        })

        expiredEvents.map(evt => {
            eventsInOrder.push(evt)
        })

        setEvents(eventsInOrder)
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
    <section className="card-holder">
    <div className="container-cards">
      {events.map(event => 
        <EventCard 
          key={event.id} 
          singleEvent={event} 
          handleDeleteEvent={handleDeleteEvent}
          />
      )}
    </div>
    </section>
  </>

  );
}