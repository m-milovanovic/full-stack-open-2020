import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={handleGood} />
      <Button text='neutral' handleClick={handleNeutral} />
      <Button text='bad' handleClick={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad, all } = props
  return (
    <div>
      <div>
        <h1>statistics</h1>
        {
          all ?
            <table>
              <tbody>
                <Statistic text='good' value={good} />
                <Statistic text='neutral' value={neutral} />
                <Statistic text='bad' value={bad} />
                <Statistic text='all' value={all} />
                <Statistic text='average' value={(good - bad) / all} />
                <Statistic text='positive' value={`${(good) / all * 100}%`} />
              </tbody>
            </table>
            :
            <div>No feedback given</div>
        }
      </div>
    </div>
  )
}

const Statistic = (props) => {
  const { text, value } = props
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = (props) => {
  const { text, handleClick } = props
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)