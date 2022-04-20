import React, {useState, useEffect} from "react"
import { getForecastWeatherData } from '../../modules/EventManager';
import { ShowEventList } from './ShowEventList'
import { ShowArticleList } from "./ShowArticleList";
import './Dashboard.css'

export const Dashboard = () => {
    
    const [weatherInfo, setWeatherInfo] = useState()
    const today = new Date().toISOString().slice(0, 10)

    const showWeather = () => {
        // call external API to fetch weather for today's date
        getForecastWeatherData("Nashville", today).then(data => {
                setWeatherInfo(data);
        });
        
    }

    useEffect(() => {
        showWeather();
    }, [])

    return (
        <> 
            <h1 className="dashboard-title">Your Dashboard</h1>
            <div className="dashboard-div">   
                {weatherInfo && 
                    <div className="card weather-div">  
                        <h3> 
                            Today's weather &nbsp;
                        </h3>
                        <hr></hr>
                        <span><img src="images/day.svg" width='100' /></span>
                        <p className="card-text"><b>{weatherInfo.location?.name}, {weatherInfo.location?.region}</b></p>
                        <p className="card-text">Current Temp: {Math.round(weatherInfo.current?.temp_f) +'\xB0F' }</p>
                        <p className="card-text">Feels Like: {Math.round(weatherInfo.current?.feelslike_f) +'\xB0F'}</p>
                        <p className="card-text">Condition: {weatherInfo.current?.condition.text}</p>    
                        <p className="card-text">Max Temp: {Math.round(weatherInfo.forecast?.forecastday[0].day.maxtemp_f) +'\xB0F' }</p>    
                        <p className="card-text">Min Temp: {Math.round(weatherInfo.forecast?.forecastday[0].day.mintemp_f) +'\xB0F' }</p>    

                    </div>
                }     
            
                    <div className="card">
                        <ShowEventList />
                    </div>
                    <div className="card">
                        <ShowArticleList />
                    </div>
            </div>
        </>
    );
}