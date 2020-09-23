import React from 'react'

const Countries = ({ countries, handleClick }) => {
    return (
        countries.map((country, i) =>
            <div key={i}>{country.name}
                <button onClick={() => handleClick(country.name)}>show</button>
            </div>
        )
    )
}

export default Countries;