import React, {useState} from "react";
import { getTaskById } from "./TaskManager";
import { useEffect } from "react";
import { updateTask } from "./TaskManager";


export const Checkbox = (taskId) => {

  const [task, setTask] = useState([])

  const getTask = () => {
    //Pull Tasks array from API...
    return getTaskById(taskId.taskId).then(task => {
      console.log (task)
      setTask(task)
    })
  }

  const setTaskComplete = (evt) => {
    evt.preventDefault()
  
    const editedTask = {
      name: task.name,
      date: task.date,
      isComplete: true,
      userId: task.userId,
      id: task.id
    };

    
    updateTask(task)
  }

  const setTaskIncomplete = (evt) => {
    evt.preventDefault()
  
    const editedTask = {
      name: task.name,
      date: task.date,
      isComplete: false,
      userId: task.userId,
      id: task.id
    };

    
    updateTask(task)
  }

  useEffect(() => {
    getTask()
  }, [])
  
  const [checkedState, setCheckedState] = useState(false)

  const handleChange = () => {
  setCheckedState(!checkedState)
  
} 

  if (task.isComplete = true) {
    console.log("True")
  }
  else {
    console.log("False")
  }

  return (
    <input type="checkbox" checked={checkedState} onChange={handleChange}/>
  )
}