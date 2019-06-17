import React, {useState} from 'react'
import Displaycountry from "./Displaycountry"

const Display = ({search, countries}) => {

    const [newCountry, setNewCountry] = useState([])
    const onClick = (country) => {
        console.log('clicked button')
        
        setNewCountry(country)
        
    }
    if (search === "") {
        if (newCountry.hasOwnProperty("name"))
            setNewCountry([])
        return <p>Type in the box to search countries by name</p>
    }
    else if (newCountry.hasOwnProperty("name")) {
        return <Displaycountry dispcountry={newCountry}/>
    }
    else if (countries.length > 9) {
        return <p>Too many search results. Please try a more specific search term.</p>
    }
    else if (countries.length < 10 && countries.length > 1) {
        const countrynames = countries.map(country => {
            console.log(country)
            return(
                <>
                    <p>{country.name} <button 
                        onClick={() => {onClick(country)}} key={country.name}> 
                            Show
                    </button></p>
                </>
            )
        })
        return countrynames
    }
    
    else if (countries.length === 1){
        return <Displaycountry dispcountry={countries[0]}/>
    }
    else{
        return <p>No results found</p>
    }
}

export default Display