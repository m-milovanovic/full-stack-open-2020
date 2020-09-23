import React from 'react'

const Persons = ({ persons, filter, handleDelete }) => {
    return (
        <div>
            {
                persons.map((person, i) => person.name.toLowerCase().includes(filter.toLowerCase()) &&
                    <div key={i}>{person.name} {person.number}<button onClick={() => handleDelete(person)}>delete</button></div>
                )
            }
        </div>
    )
}

export default Persons;