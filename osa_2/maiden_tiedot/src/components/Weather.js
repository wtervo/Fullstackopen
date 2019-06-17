import React, {useState, useEffect} from 'react'
import axios from "axios"
import apiKey from "./apiKey"

const Weather = ({country}) =>{

    const capital = country.capital
    const [dataGet, setDataGet] = useState(false)
    const [newWeather, setNewWeather] = useState([])

    const hook = () => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`)
            .then(response => {
                console.log('Weather data promise get')
                setNewWeather(response.data)
                setDataGet(true)
        })
    }

    useEffect(hook, [])

    if (dataGet) {
        return(
            <>
                <h3>Weather in {capital}</h3>
                <p><b>Temperature: </b>{newWeather.main.temp} degree Celcius</p>
                <p><b>{newWeather.weather[0].main}: </b>{newWeather.weather[0].description}</p>
                <p><b>Wind: </b>{newWeather.wind.speed} km/h, {newWeather.wind.deg} degree</p>
                <p><b>Lenght of day: </b> {(newWeather.sys.sunset - newWeather.sys.sunrise) / 3600} hours</p>
            </>
        )
    }
    return null
}


export default Weather