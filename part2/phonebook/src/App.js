import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/personsService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const resetMessage = () => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  const getPersons = () => {
    personsService.getAll()
      .then(data => setPersons(data))
  }

  useEffect(() => {
    getPersons()
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    number: ''
  })

  const [filter, setFilter] = useState('')

  const handleChange = (name) => (e) => {
    const value = e.target.value
    setFormData({ ...formData, [name]: value })
  }

  const handleFilter = (e) => {
    const value = e.target.value
    setFilter(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: formData.name,
      number: formData.number
    }

    const filtered = persons.filter(person => person.name === formData.name)

    if (filtered.length > 0) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personsService.update(filtered[0].id, newPerson)
          .then(() => {
            getPersons()
            setMessage({
              text: `${newPerson.name}'s phone number changed`,
              variant: 'success'
            })
            resetMessage()
          })
      }
      return
    }

    personsService.create(newPerson)
      .then(() => {
        getPersons()
        setMessage({
          text: `${newPerson.name} added`,
          variant: 'success'
        })
        resetMessage()
      })

  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.deletePerson(person.id)
        .then(() => {
          getPersons()
          setMessage({
            text: `${person.name} successfully deleted`,
            variant: 'success'
          })
          resetMessage()
        })
        .catch(() => {
          getPersons()
          setMessage({
            text: `Information of ${person.name} has already been removed from the server`,
            variant: 'error'
          })
          resetMessage()
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add new</h2>
      <PersonForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App