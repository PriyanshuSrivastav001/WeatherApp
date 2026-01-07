import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
  const Weather=()=>{
    const inputRef=useRef()
    const[WeatherData,setWeatherData]=useState(false);
    const [message,setMessage]=useState("")
    const search = async (city)=>{
      const value=city;
      if(!value){
        setMessage("Please Enter a City Name")
        setWeatherData(null);
 return;
      } 
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response=await fetch(url);
      const data =await response.json();
      console.log(data);
      if(data.cod==="404"){
        setMessage("City Not Found");
        setWeatherData(null);
        return ;
      }
      setMessage("");
      setWeatherData({
        windspeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        feels:Math.floor(data.main.feels_like),
        description:data.weather[0].main,
      })
       }
    const handlekeydown=(event)=>{
    if(event.key==="Enter"){
      event.preventDefault();
      search(inputRef.current.value);
        }}
  return (
<>
    <div className="weather"><h1>Weather</h1>
    <div className="main">
      <div className="input">
        <input id="input" ref={inputRef} type='text' placeholder='Enter City Name'
         onKeyDown={handlekeydown} ></input></div>
        <div className="icon"><i className="fa-solid fa-magnifying-glass" onClick={()=>search(inputRef.current.value)}  ></i></div>
</div>
{message && <h1>{message}</h1>}
     {WeatherData && <div className="city"> 
        <span><h2>{WeatherData.temperature}°C</h2><h4>Today's Weather: {WeatherData.description}</h4>
        <h1>{WeatherData.location}</h1>
         </span>
          <span> <h3>Feels Like {WeatherData.feels}°C</h3></span>
         <div className="data"><i className="fa-solid fa-wind"></i><p>{WeatherData.windspeed}km/h <br/>Wind Speed</p><br></br></div>
      </div>   
  }
    </div>
     </>
 )
}
export default Weather
