import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './Countries'
import Country from './Country'

function App() {
  const [filter, setFilter] = useState('')
  const handleChange = (e) => {
    const value = e.target.value
    setFilter(value)
  }

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${filter}`)
      .then(response => setCountries(response.data))
  }, [filter])

  const [countries, setCountries] = useState([])

  const handleClick = (name) => {
    setCountries([...countries.filter(c => c.name === name)])
  }

  return (
    <div>
      <div>find countries <input value={filter} onChange={handleChange} /></div>
      <div>
        {
          countries.length > 10
            ?
            <div>Too many matches, specify another filter</div>
            :
            countries.length > 1
              ?
              <Countries handleClick={handleClick} countries={countries} />
              :
              countries.length === 1 && <Country country={countries[0]} />
        }
      </div>
    </div>
  );
}

export default App;
