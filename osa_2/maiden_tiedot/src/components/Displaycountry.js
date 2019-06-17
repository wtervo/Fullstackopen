import React from 'react'
import Weather from "./Weather"


const Displaycountry = ({dispcountry}) => {
    const langlist = dispcountry.languages.map(language => <li>{language.name}</li>)
    return(
        <>
            <p><font size="+3"><b>{dispcountry.name}</b></font></p>
            <p>Capital: {dispcountry.capital}</p>
            <p>Population: {dispcountry.population}</p>
            <p><font size="+2"><b>Languages</b></font></p>
            <ul>
                <p>{langlist}</p>
            </ul>
            <picture>
                <img src={dispcountry.flag} alt="" height="200" width="auto"/>
            </picture>
            <Weather country={dispcountry}/>
        </>
    )
}

export default Displaycountry