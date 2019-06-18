import React from "react"

const Errormessage = ({message}) => {
    if (message === null) {
        return null
    }
    
    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Errormessage