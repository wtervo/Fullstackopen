import React from 'react'
import pbService from './services/pbService';

const Display = ({persons, searchfilter}) => {
    const buttonHandler = person => {
      if (window.confirm(`Do you want to remove ${person.name} from the phonebook?`)) {
        pbService
          .remove(person.id)
            .then(console.log("Person removed from the phonebook"))
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

export default Display