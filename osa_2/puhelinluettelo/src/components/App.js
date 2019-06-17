import React, {useState, useEffect} from 'react'
import axios from "axios"
import Display from "./Display"
import Input from "./Input"
import Filter from "./Filter"


const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const similarTest = persons.find(person => person.name === newName)
    if (similarTest) {
      window.alert(`${newName} is already in the phonebook`)
      setNewName("")
      setNewNumber("")
    }

    else{
      setPersons(persons.concat(nameObject))
      setNewName("")
      setNewNumber("")
    }
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add new contact</h3>
      <form onSubmit={addName}>
        <Input val={newName} change={handleNameChange} text={"Name: "}/>
        <Input val={newNumber} change={handleNumberChange} text={"Number :"}/>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Display persons={persons} searchfilter={newFilter}/>
    </div>
  )

}

export default App