import React from "react";
import { Link } from "react-router-dom";

  

export const TaskCard = ({task, callDeleteTask}) => {
  
  const checkComplete = () => {
    
  }
  
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <input
            type="checkbox"
          />
          <h2>{task.name}</h2>
        </div>  
        <p>Complete By: <b>{task.date}</b></p>
        <button type="button" className="btn btn-primary" onClick={() => callDeleteTask(task.id)}>Delete</button>
      </div>
    </div>
  )
}