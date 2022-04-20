import React, { useState, useEffect } from 'react';
import { ShowEventCard } from './ShowEventCard';
import { getAllEvents } from '../../modules/EventManager';
import { getFriendsOfActiveUser } from '../../modules/FriendManager'
import './Dashboard.css'

export const ShowEventList = () => {
  
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    
    let expiredEvents = []
    let upcomingEvents = []
    let eventsInOrder = []
    // getAllEvents() will return events sorted on date
    return getAllEvents().then(eventsFromAPI => {

      const activeUserId = JSON.parse(sessionStorage.getItem("nutshell_user")).id
      
        // get all the events that are expired
        expiredEvents = eventsFromAPI.filter(evt => {
            return ((new Date(evt.date) < new Date()))
        })

        // get all the upcoming events
        upcomingEvents = eventsFromAPI.filter(evt => {
            return ((new Date(evt.date) >= new Date()))
        })

        // get the friends of the logged in user (or active user)
        getFriendsOfActiveUser(activeUserId).then(friends => {

          // userIds[] will have ids of active user and its friends' ids
          const userIds = [activeUserId, friends.map(f => f.theirId)].flat()

          upcomingEvents.map(evt => {
          
            // if the event is posted by the active user or a friend 
            // of the active user then add the event to the array
            if (userIds.includes(evt.userId)) {
              eventsInOrder.push(evt)
            }
        
          });
          
          expiredEvents.map(evt => {
          
            // add the expired events at the bottom of the list only if 
            // they are posted by the active user or its friends
            if (userIds.includes(evt.userId)) {
                eventsInOrder.push(evt)
              }
            });
          setEvents(eventsInOrder)            
        })
    });
  };

  // got the Events from the API on the component's first render
  useEffect(() => {
    getEvents();
  }, []);

  // Finally we use .map() to "loop over" the Events array to show a list of Event cards
  return (
  <>

    <h3> 
        Events
    </h3>
    <hr></hr>
    <div className="event-container-cards">
        {events.map(event => 
            <ShowEventCard 
                key={event.id} 
                singleEvent={event} 
            />
        )}
    </div>
  </>

  );
}