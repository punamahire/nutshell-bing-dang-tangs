import React from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "./Checkbox";
import { useNavigate } from "react-router-dom";


export const TaskCard = ({task, callDeleteTask}) => {
  
  const navigate = useNavigate()
  
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <Checkbox taskId={task.id}/>
          <h2>{task.name}</h2>
        </div>  
        <div className="card-buttons">
        <p>Complete By: <b>{task.date}</b></p>
        <button type="button" className="btn btn-primary" onClick={() => callDeleteTask(task.id)}>Delete</button>
        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/tasks/${task.id}/edit`)}}>Edit</button>
        </div>
      </div>
    </div>
  )
}