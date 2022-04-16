import React from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "./Checkbox";

  

export const TaskCard = ({task, callDeleteTask}) => {
  
  
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <Checkbox taskId={task.id}/>
          <h2>{task.name}</h2>
        </div>  
        <p>Complete By: <b>{task.date}</b></p>
        <button type="button" className="btn btn-primary" onClick={() => callDeleteTask(task.id)}>Delete</button>
      </div>
    </div>
  )
}