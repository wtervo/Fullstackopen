import React from 'react'
import Input from "./Input"

const Filter = ({newFilter, handleFilterChange}) => {
    return(
      <form>
        <Input val={newFilter} change={handleFilterChange} text={"Filter "}/>
      </form>
    )
}

export default Filter