import React from 'react'

const Display = ({persons, searchfilter}) => {
    if (searchfilter === '') {
      const new_arr = persons.map(person => <p>{person.name} {person.number}</p>)
      return new_arr
    }
  
    else{
      const filterlist = persons.filter(person => person.name.toLowerCase().includes(searchfilter.toLowerCase()))
      const new_arr = filterlist.map(person => <p>{person.name} {person.number}</p>)
      return new_arr
    }
  }

export default Display