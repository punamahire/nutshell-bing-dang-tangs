import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Task.css";
import { getAllTasks, deleteTask, getUserById } from "./TaskManager";
import { TaskCard } from "./TaskCard";



//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const Tasks = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

let tmp = JSON.parse(sessionStorage.getItem("nutshell_user"));
let currentUser = tmp.id;


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//---------------------------------------------------SET EMPTY TASKS ARRAY-------------------------------------------------------------//

  const [tasks, setTasks] = useState([])


  const filterTasks = (tasks) => {
    const filteredByUser = tasks.filter(task => task.userId === currentUser)
    console.log(filteredByUser)
    const filteredByComplete = filteredByUser.filter(task => task.isComplete === false)
    console.log(filteredByComplete)
    return(filteredByComplete)
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
        <button type="button" className="btn btn-primary" onClick={() => {navigate("/tasks/completed")}}>Completed Tasks</button>
      </section>
      <section className="card-container-tasks">
        {tasks.map(task =>
          <TaskCard key={task.id} task={task} callDeleteTask={callDeleteTask}/>
        )}
      </section>
    </main>
  );
}