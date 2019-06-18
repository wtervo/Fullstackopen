import React, {useState, useEffect} from 'react'
import "./../index.css"
import Input from "./Input"
import Filter from "./Filter"
//import Display from "./Display"
import pbService from "./services/pbService"
import Notification from "./Notification"
import Errormessage from "./Errormessage"



const App = () => {
 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  //originally had Display component in its separate file, but this arrangement did not
  //work with the deletion hooks and at this point I do not know any other way to fix it
  
  const Display = ({persons, searchfilter}) => {
    
    const buttonHandler = person => {
      const personname = person.name
      
      if (window.confirm(`Do you want to remove ${person.name} from the phonebook?`)) {
        pbService
          .remove(person.id)
            .then(() => {
              console.log(`${personname} removed from the phonebook`)
              setNotificationMessage(`${personname} removed from the phonebook`)
              setNewName("  ")
              setNewName("")
              setTimeout(() => {
                setNotificationMessage(null)
              }, 3000)
            })
            .catch(() => {
              setErrorMessage(`"${personname}" was already removed from the phonebook`)
              setPersons(persons.filter(n => n.id !== person.id))
              setNewName("  ")
              setNewName("")
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
            })
      }
    }
  
    if (searchfilter === '') {
      const new_arr = persons.map(person => <p>{person.name} {person.number} <button onClick={
          () => buttonHandler(person)
        }>remove</button> </p>)
      return new_arr
    }
  
    else{
      const filterlist = persons.filter(person => person.name.toLowerCase().includes(searchfilter.toLowerCase()))
      const new_arr = filterlist.map(person => <p>{person.name} {person.number} <button onClick={
          () => buttonHandler(person)
        }>remove</button> </p>)
      return new_arr
    }
  }

  const hook = () => {
    pbService
      .getAll()
        .then(dbPersons => {
          setPersons(dbPersons)
      })
  }

  useEffect(hook, [newName]) //improvements for the future: render just once after name has been
  //deleted (after button press) instead of continuously observing changes in the server data

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`"${newName}" is already in the phonebook. Do you wish to replace the number with a new one?`)) {
        const personInfo = persons.find(person => person.name === newName)
        const personname = personInfo.name
        const changedInfo = {...personInfo, number: newNumber}
        pbService
        .replace(changedInfo)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setNewName("")
            setNewNumber("")
            setNotificationMessage(`Number changed for "${returnedPerson.name}"`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
          })
          .catch(() => {
            setErrorMessage(`"${personname}" was already removed from the phonebook`)
            setPersons(persons.filter(n => n.id !== personInfo.id))
            setNewName("  ")
            setNewName("")
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
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
            setNotificationMessage(`"${returnedPerson.name}" has been added to the phonebook`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
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
      <Notification message={notificationMessage}/>
      <Errormessage message={errorMessage} />
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