import React from 'react'
import Displaycountry from "./Displaycountry"

const Display = ({search, countries}) => {

    if (search === "") {
        return <p>Type in the box to search countries by name</p>
    }
    else if (countries.length > 9) {
        return <p>Too many search results. Please try a more specific search term.</p>
    }
    else if (countries.length < 10 && countries.length > 1) {
        const countrynames = countries.map(country => {
            return  <p>{country.name}</p>
        })
        return countrynames
    }
    else if (countries.length === 1) {
        return <Displaycountry dispcountry={countries[0]}/>
    }
    else{
        return <p>No results found</p>
    }
}

export default Display