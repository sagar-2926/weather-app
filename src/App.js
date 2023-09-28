import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

export default function App() {
  const [weatherData,setWeatherData] = useState({});
  const [city , setCity] = useState("Pune");
  const [weatherDiscription,setWeatherDiscription] = useState("");

 async function loadWeatherData() {
    let response = ""
    try {

      response =await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c20b7414d083408cadcb2f16f510ca4`)
      setWeatherData(response.data);
    } 
    catch (error)  {
      console.log(error);
    }
  }
   useEffect (() => {
    loadWeatherData();
   } ,[])

   useEffect (() => {
      loadWeatherData ();
   }, [city]);
   useEffect (() => {

    setWeatherDiscription(`${weatherData?.weather?.[0]?.main }
    (${weatherData?.weather?.[0]?.main})`)
   }, [weatherData]);

  return (
    <div className='main-container'>

     <p className='main-heading'> Today Weather <i class="fa-solid fa-cloud-showers-heavy"></i></p>
     <p className='heading-city'>{weatherData?.name}</p>
     <p className='main-tempature'>Temperature:{(weatherData?.main?.temp - 273).
     toFixed(2)}°C</p>
     <p className='main-visibility'>Visibility : {weatherData?.visibility} meters</p>
       <p className='main-discription'> Discription :{weatherDiscription}</p> 
       <input className='input-box' type="text"  value={city} onChange={(e) => {
      setCity(e.target.value );
     }} ></input> 
    </div>
   
  )
}