import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import axios from 'axios'

const Country = ({ country }) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
            .then(response => setWeather({...response.data}))
    }, [country.capital])

    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>Spoken languages</h2>
            <ul>
                {
                    country.languages.map((language, i) => <li key={i}>{language.name}</li>)
                }
            </ul>
            <img alt='The country flag' src={country.flag} width={100} />
            <h2>Weather in {country.capital}</h2>
            {
                weather && <Weather weather={weather} />
            }
        </div>
    )
}

export default Country;