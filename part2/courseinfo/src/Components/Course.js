import React from 'react';

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {
          parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)
        }
      </div>
    )
  }
  
  const Part = ({ part, exercises }) => {
    return (
      <p>
        {part} {exercises}
      </p>
    )
  }
  
  const Total = ({ parts }) => {
    return (
      <b>total of {  parts.reduce((s, p) => s + p.exercises, 0)} exercises</b>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course;

