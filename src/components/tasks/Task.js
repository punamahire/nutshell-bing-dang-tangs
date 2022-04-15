import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Task.css";
import { getAllTasks, deleteTask } from "./TaskManager";
import { TaskCard } from "./TaskCard";



//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const Tasks = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

  let currentUser = parseInt(sessionStorage.getItem("nutshell_user", JSON.stringify()))


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//---------------------------------------------------SET EMPTY TASKS ARRAY-------------------------------------------------------------//

  const [tasks, setTasks] = useState([])


  const filterTasks = (tasks) => {
    const filtered = tasks.filter(task => task.userId === currentUser)
    return(filtered)
  }

  

//-----------------------------------POPULATE EMPTY TASKS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

  const getTasks = () => {
    //Pull Tasks array from API...
    return getAllTasks().then(allTasks => {
      //...then populate empty tasks array with what comes back.
      const filtered = filterTasks(allTasks)
      setTasks(filtered)
    })
  }


//------------------------------------------RUN getTasks FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
  getTasks()
}, [])

//--------------------------------------------CALLS THE deleteTask FUNCTION-------------------------------------------------------------//

const callDeleteTask = (id) => {
  deleteTask(id)
  .then(() => getTasks())
};


 //--------------------------------GENERATE HTML FOR TASKS PAGE AND GENERATE FRIEND CARDS------------------------------------------------// 

  return (
    <main>
      <section className="task-header">
        <h1>Tasks</h1>
        <button type="button" className="btn btn-primary" onClick={() => {navigate("/tasks/add")}}>Add Task</button>
      </section>
      <section className="card-container">
        {tasks.map(task =>
          <TaskCard key={task.id} task={task} callDeleteTask={callDeleteTask}/>
        )}
      </section>
    </main>
  );
}