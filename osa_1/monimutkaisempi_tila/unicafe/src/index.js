import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Data = ({good, bad, neutral, all}) => {
    if (all === 0) {
        return(
            <p>No feedback given yet</p>
        )
    }

    return(
        <table>
          <tbody>
            <Statistics text={"Good:"} value={good}/>
            <Statistics text={"Neutral:"} value={neutral}/>
            <Statistics text={"Bad:"} value={bad}/>
            <Statistics text={"All:"} value={all}/>
            <Statistics text={"Average:"} value={(good * 1 + neutral * 0 + bad * -1) / all}/>
            <Statistics text={"Positive:"} value={100 * good / all}/>
          </tbody>
      </table>
    )
}

const Statistics = ({text, value}) => {
    if (text === "Positive:") {
        return(
            <tr><th>{text}</th><td>{value} %</td></tr>
        )
    }
    return(
        <tr><th>{text}</th><td>{value}</td></tr>
    )
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  return (
    <div>
      <p><font size="+3"><b>Give feedback</b></font></p>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <p><font size="+3"><b>Statistics</b></font></p>
      <Data good={good} neutral={neutral} bad={bad} all={all} />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)