import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import { getWeatherData } from '../../modules/EventManager';

export const Weather = ({ location, date }) => {
    
    const [weatherInfo, setWeatherInfo] = useState()
    const today = new Date().toISOString().slice(0, 10)
    const fourteenDaysAhead = new Date().setDate(new Date().getDate() + 14)

    const handleShowWeather = () => {
        // call external API to fetch weather for the event's date
        // if the event is too far in the future, fetch current weather data
        
        if (new Date(date) <= fourteenDaysAhead) {
                getWeatherData(location, date).then(data => {
                setWeatherInfo(data);
            });
        } else {
                getWeatherData(location, today).then(data => {
                setWeatherInfo(data);
            });
        }
        
    }

    useEffect(() => {
        handleShowWeather();
    }, [])

    return (
        <> 
          { weatherInfo && 
            (<div className="weather-card">
                <div className="card-content">
                    {/* <picture>
                        <img className="card-img" src={`./images/puppy_${singleEvent.id}.png`} alt="My Dog" />
                    </picture> */
                    }
                    <hr></hr>
                    <h3> 
                        <span className="card-petname">
                            {weatherInfo.location?.name}, {weatherInfo.location?.region}
                        </span>
                    </h3>
                    <p>Temperature: {weatherInfo.current?.temp_f}</p>
                    <p>Condition: {weatherInfo.current?.condition.text}</p>
                    <p>Feels Like: {weatherInfo.current?.feelslike_f}</p>
                    { (new Date(date) > fourteenDaysAhead) && 
                        <div>
                            <p>Weather forecast for the date of the event cannot be determined.</p> 
                            <p>Event is too far in the future.</p>
                        </div>
                    }
                
                </div>
            </div>)
          } 
        </>
    );
}