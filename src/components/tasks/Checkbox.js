import React, {useState} from "react";
import { getTaskById } from "./TaskManager";
import { useEffect } from "react";
import { updateTask } from "./TaskManager";


export const Checkbox = (taskId) => {

  const [task, setTask] = useState([])

  const getTask = () => {
    //Pull Tasks array from API...
    return getTaskById(taskId.taskId).then(task => {
      setTask(task)
    })
  }

  const setTaskComplete = (evt) => {
    console.log("Setting Task as Complete")
    const editedTask = {
      name: task.name,
      date: task.date,
      isComplete: true,
      userId: task.userId,
      id: task.id
    };
    console.log(editedTask)

    
    setTask(editedTask)
    updateTask(editedTask)
  }

  const setTaskIncomplete = (evt) => {
    console.log("Setting Task as Incomplete")
    const editedTask = {
      name: task.name,
      date: task.date,
      isComplete: false,
      userId: task.userId,
      id: task.id
    };
    
    setTask(editedTask)
    updateTask(editedTask)
  }

  useEffect(() => {
    getTask()
    handleCurrentStatus()
  }, [])
  
  const [checkedState, setCheckedState] = useState(false)

  const handleCurrentStatus = () => {
    getTaskById(taskId.taskId).then(checkedTask => {
      setCheckedState(checkedTask.isComplete)
  })
}

  const handleChange = () => {
    
    if (task.isComplete === false) {
      setCheckedState(!checkedState)
      setTaskComplete()
    }
    else {
      setCheckedState(!checkedState)
      setTaskIncomplete()
    }
  
} 


  return (
    <input type="checkbox" checked={checkedState} onChange={handleChange}/>
  )
}