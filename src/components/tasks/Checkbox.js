import React, {useState} from "react";
import { getTaskById } from "./TaskManager";
import { useEffect } from "react";


export const Checkbox = (taskId) => {

  const [task, setTask] = useState([])

  const getTask = () => {
    //Pull Tasks array from API...
    return getTaskById(taskId.taskId).then(task => {
      console.log (task)
      setTask(task)
    })
  }

  useEffect(() => {
    getTask()
  }, [])
  
  const [checkedState, setCheckedState] = useState(false)

  const handleChange = () => {
  setCheckedState(!checkedState)
  
} 

  return (
    <input type="checkbox" checked={checkedState} onChange={handleChange}/>
  )
}