import React from 'react'

const Total = ({parts}) => {
    const parts_id = parts.map(part => part.exercises)
    const reducer = (a, c) => a + c
    return <p>Total number of exercises: {parts_id.reduce(reducer)}</p>
}

const Content = ({parts}) => {
    const new_arr = parts.map(part => 
        <p key={part.id}>
            {part.name} {part.exercises}
        </p>
    )
    return new_arr
}

const Course = ({course}) => {
    return(
        <>
            <p><font size="+2"><b>{course.name}</b></font></p>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course