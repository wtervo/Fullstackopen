import React, {useState, useEffect} from 'react'
import Display from "./Display"
import Input from "./Input"
import Filter from "./Filter"
import pbService from "./services/pbService"


const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    pbService
      .getAll()
        .then(dbPersons => {
          setPersons(dbPersons)
      })
  }

  useEffect(hook, [persons]) //improvements for the future: render just once after name has been
  //deleted (after button press) instead of continuously observing changes in the server data

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook. Do you wish to replace the number with a new one?`)) {
        const personInfo = persons.find(person => person.name === newName)
        const changedInfo = {...personInfo, number: newNumber}
        pbService
        .replace(changedInfo)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setNewName("")
            setNewNumber("")
          })
      }
    }

    else{
      pbService
        .create(nameObject)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.concat(returnedPerson))
            setNewName("")
            setNewNumber("")
          })
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