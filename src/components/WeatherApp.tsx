import React, { useState, useEffect } from 'react'

type Weather = {
    id: number,
    cityName: string,
    temperature: number,
    weather: string,
    icon: string
  }

const WeatherApp = () => {

    
  const[weatherDataArray, setWeatherDataArray] = useState<Weather[]>([]);
  const[weatherData, setWeatherData] = useState<Weather | null>()
  const [searchCity, setSearchCity] = useState<string>();
  const [error, setError] = useState<string | null>();

  const handleSearchCityChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value)
} 

    const fetchWeather = async () =>{

        try {
            let url = '/Weather.json'
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error
            }
            const data = await res.json();
            setWeatherDataArray(data.weather)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchWeather()
    },[])

    const handleSearchButton = () => {

        if (searchCity) {
            const foundCity = weatherDataArray.find(u => u.cityName.toLowerCase().includes(searchCity?.toLowerCase()))
            if (foundCity) {
                setWeatherData(foundCity)
                setError(null)
            }
            else
            {
                setError("No city like that")
                setWeatherData(null)
            }
        }
    
    }
    

  return (
    <>
      <div className='searchField'>
        <input type="text" value={searchCity} onChange={handleSearchCityChange} />
        <button onClick={handleSearchButton} >Search</button>
      </div><br />

      <div className='container'>
        {error && <p>{error}</p>}
        {weatherData && 
            <div className='weatherConatiner'>
                <div className='icon'>
                    <img src={weatherData.icon}></img>
                </div><br />
                <div className='weatherData'>
                    <p>City: {weatherData?.cityName}</p>
                    <p>Temperature: {weatherData?.temperature} °C</p>
                    <p>Weather: {weatherData?.weather}</p>
                </div>        
            </div>
        }
      </div>
    </>
  )
}

export default WeatherApp