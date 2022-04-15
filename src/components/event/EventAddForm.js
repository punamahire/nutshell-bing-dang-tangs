import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEvent } from '../../modules/EventManager';
import { Button, Form, Container } from "react-bootstrap"
import './EventAddEditForm.css'

export const EventAddForm = () => {

	const [eventObj, setEvent] = useState({
		name: "",
		date: "",
		location: "",
        userId: 0
	});

	const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

	const handleControlledInputChange = (event) => {
		
		const newEvent = { ...eventObj }
		let selectedVal = event.target.value

		newEvent[event.target.id] = selectedVal
		// update state
		setEvent(newEvent)		
	}

	const handleClickSaveEvent = (event) => {
		event.preventDefault()

        console.log("inside save button click")

        const userObj = JSON.parse(sessionStorage.getItem("nutshell_user"))
		eventObj.userId = userObj.id;

		if (eventObj.name === "" || eventObj.date === "" || eventObj.location === "") {
			window.alert("Please enter name, date and location")
		} else {
            console.log("event object:", eventObj)
			//invoke addEvent passing eventObj as an argument.
			//once complete, change the url and display the Event list
			setIsLoading(true);
			addEvent(eventObj)
				.then(() => navigate("/events"))
		}
	}

	return (
        <Container>
		<Form className="EventForm">
			<h2 className="EventForm__title">New Event</h2>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Event name:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Event name" value={eventObj.name} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="date">Event date:</label>
					<input type="date" id="date" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Event date" value={eventObj.date} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="location">Event location:</label>
					<input type="text" id="location" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Event location" value={eventObj.location} />
				</div>
			</fieldset>
			<Button type="button" className="btn btn-primary"
				disabled={isLoading}
				onClick={handleClickSaveEvent}>
				Save Event
          </Button>
		</Form>
    </Container>
	)
};
