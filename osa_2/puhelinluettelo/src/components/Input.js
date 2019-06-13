import React from 'react'

const Input = ({val, change, text}) => {
    return(
        <div>
            {text} <input 
                value={val}
                onChange={change}
            />
        </div>
    )
}

export default Input