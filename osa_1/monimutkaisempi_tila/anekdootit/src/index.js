import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Random_num = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Addone = (votes, selected) => {
    const copy = [...votes]
    copy[selected] += 1
    return copy
}

const Mostpopular = ({anecdotes, votes}) => {
    var found = votes.find(val => val > 0)
    if (found === undefined) {
        return(<p>No votes yet</p>)
    }
    const maxvotes = Math.max.apply(Math, votes)
    console.log(maxvotes)
    const mostpop = votes.findIndex(val => val === maxvotes)
    return(
        <div>
            <p>{anecdotes[mostpop]}</p>
            <p>Has {maxvotes} votes</p>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const max_n = anecdotes.length
  const [votes, setVote] = useState(new Uint8Array(max_n))

  return (
    <div>
      <p><font size="+3"><b>Anecdote of the day</b></font></p>
      <p>{props.anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <Button handleClick={() => setVote(Addone(votes, selected))} text="Vote"/>
      <Button handleClick={() => setSelected(Random_num(max_n))} text="Next anecdote"/>
      <p><font size="+3"><b>Anecdote with the most votes</b></font></p>
      <Mostpopular anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)