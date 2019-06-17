import React, {useState, useEffect} from 'react'
import axios from "axios"
import Display from "./Display.js"

const App = () => {
    
    const [newCountries, setNewCountries] = useState([])
    const [newSearch, setNewSearch] = useState('')

    const hook = () => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                console.log('Country data promise get')
                const filteredcountries = response.data.filter(country => {
                    const filtered = country.name.toLowerCase().includes(newSearch.toLowerCase())
                    return filtered
                })
                setNewCountries(filteredcountries)
        })
    }

    useEffect(hook, [newSearch])
   

    const handleChange = (event) => {
        console.log(event.target.value)
        setNewSearch(event.target.value)
        
      }

    return(
        <div>
            <h2>Data about countries of the world</h2>
            Find countries: <input
                value={newSearch}
                onChange={handleChange}
            />
            <Display search={newSearch} countries={newCountries} />
        </div>
    )
}


export default App