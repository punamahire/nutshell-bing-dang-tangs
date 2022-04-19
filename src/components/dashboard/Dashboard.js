import React, {useState, useEffect} from "react"
import { getWeatherData } from '../../modules/EventManager';
import './Dashboard.css'

export const Dashboard = () => {
    
    const [weatherInfo, setWeatherInfo] = useState()
    const today = new Date().toISOString().slice(0, 10)

    const showWeather = () => {
        // call external API to fetch weather for today's date
        getWeatherData("Nashville", today).then(data => {
                setWeatherInfo(data);
        });
        
    }

    useEffect(() => {
        showWeather();
    }, [])

    return (
        <> 
          { weatherInfo && 
            <div className="dashboard-div">
                <h1 className="dashboard-title">Your Dashboard</h1>
                <div className="card">  
                    <h3> 
                        Today's weather
                    </h3>
                    <hr></hr>
                    <p className="card-text">Temperature: {Math.round(weatherInfo.current?.temp_f) +'\xB0F' }</p>
                    <p className="card-text">Feels Like: {Math.round(weatherInfo.current?.feelslike_f) +'\xB0F'}</p>
                    <p className="card-text">Condition: {weatherInfo.current?.condition.text}</p>    
                </div>
            </div>
          } 
        </>
    );
}