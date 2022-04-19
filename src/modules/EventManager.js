import { settings } from "../Settings.js"

const remoteURL = "http://localhost:8088"

export const getAllEvents = () => {
    return fetch(`${remoteURL}/events?_sort=date`)
    .then(res => res.json())
}

export const getEventById = (eventId) => {
    return fetch(`${remoteURL}/events/${eventId}`)
    .then(res => res.json())
}

export const deleteEvent = id => {
    console.log("inside deleteEvent", id)
    return fetch(`${remoteURL}/events/${id}`, {
      method: "DELETE"
    }).then(result => result.json())
}

export const addEvent = newEvent => {
    return fetch(`${remoteURL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
    }).then(response => response.json())
}

export const updateEvent  = (editedEvent) => {
	return fetch(`${remoteURL}/events/${editedEvent.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(editedEvent)
	}).then(data => data.json());
}

// weather API fetch calls
let weatherData

export const useWeather = () => {
    return {...weatherData}
}

export const getWeatherData = (location, date) => {
    return fetch(`http://api.weatherapi.com/v1/current.json?key=${settings.weatherKey}&q=${location}&aqi=no&dt=${date}`)
    .then(response => response.json())
}