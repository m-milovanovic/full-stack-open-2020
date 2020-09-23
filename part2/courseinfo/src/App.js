import React from 'react'
import Course from './Components/Course';

const App = () => {
    const courses = [
      {
        id: 1,
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          }
        ]
      },
      {
        id: 2,
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 45,
            id: 15
          },
          {
            name: 'Using props to pass data',
            exercises: 20,
            id: 25
          },
          
        ]
      }
    ]
  
    return (
      <div>
        {
          courses.map(course => <Course key={course.id} course={course} />)
        }
      </div>
    )
  }

  export default App;