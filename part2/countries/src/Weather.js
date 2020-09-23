import React from 'react'

const Weather = ({ weather }) => {
    return (
        <div>
            <div><b>temperature:</b> {weather.current.temperature} celsius</div>
            <img alt='The capital temperature' src={weather.current.weather_icons[0]} width={50} />
            <div><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
        </div>
    )
}

export default Weather;