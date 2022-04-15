import React from "react";
import { Link } from "react-router-dom";

export const TaskCard = ({task, callDeleteTask}) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2>{task.name}</h2>
        <p>{task.description}</p>
        <button type="button" className="btn btn-primary" onClick={() => callDeleteTask(task.id)}>Delete</button>
      </div>
    </div>
  )
}