import React from "react"
import './Dashboard.css'

export const ShowEventCard = ({ singleEvent }) => {

    return (
      <div className="dashboard-event-card">
        <div className="event-card-content">
          <h4 className="event-title">
                {singleEvent.name}
          </h4>
          <p>Date: {new Date(singleEvent.date).toDateString()} @ {new Date(singleEvent.date).toLocaleTimeString()} </p>
          <p>Location: {singleEvent.location}</p>
        </div>
      </div>
    );
}