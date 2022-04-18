import React from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { ArticleList } from "./article/ArticleList"
import { ArticleForm } from "./article/ArticleForm"
import { ArticleEditForm } from "./article/ArticleEditForm"
import { Friends } from "./friends/Friends.js"
import { FriendForm } from "./friends/FriendForm"
import { EventList } from "./event/EventList"
import { EventAddForm } from "./event/EventAddForm"
import { EventEditForm } from "./event/EventEditForm"
import { Tasks } from "./tasks/Task.js"
import { TaskForm } from "./tasks/TaskForm"
import { TaskEditForm } from "./tasks/TaskEditForm"
import { CompletedTasks } from "./tasks/CompletedTasks"
import "./event/EventAddEditForm.css"


export const ApplicationViews = ({setAuthUser, isAuthenticated, setIsAuthenticated}) => {
  const PrivateOutlet = () => {
		return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
	}
  
  // const setAuthUser = (user) => {
	// 	sessionStorage.setItem("nutshell_user", JSON.stringify(user))
	// 	setIsAuthenticated(sessionStorage.getItem("nutshell_user") !== null)
	// }
  
  return (
    <>
    <Routes>
      <Route path="/" element={<PrivateOutlet/>} >

        <Route path="/friends" element={<Friends/>} />
        <Route path="/friends/add" element={<FriendForm/>} />

        <Route path="/messages" element={""} />

        <Route path="/tasks" element={<Tasks/>} />
        <Route path="/tasks/completed" element={<CompletedTasks/>} />
        <Route path="/tasks/add" element={<TaskForm/>} />
        <Route path="/tasks/:taskId/edit" element={<TaskEditForm/>} />

        <Route path="/events" element={<EventList/>} />
        <Route path="/events/create" element={<EventAddForm/>} />
        <Route path="/events/:eventId/edit" element={<EventEditForm/>} />
      </Route>
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/add" element={<ArticleForm />} />
      <Route path="/articles/:articleId/edit" element={<ArticleEditForm />} />
      <Route path="/login" element={<Login setAuthUser={setAuthUser}/> }/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </>
  )
}
