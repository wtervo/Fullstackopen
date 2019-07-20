import React from "react"
import {addAnecdote} from "../reducers/anecdoteReducer"
import {notificationChange} from "../reducers/notificationReducer"
import {connect} from "react-redux"

const AnecdoteForm = (props) => {
	const newAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ""
		props.addAnecdote(content)
		props.notificationChange(`Added a new anecdote: ${content}`)
		setTimeout(() => {
			props.notificationChange(null)
		}, 5000)
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={newAnecdote}>
				<div><input name="anecdote"/></div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

const mapDispatchToProps = {
	addAnecdote,
	notificationChange
}

const ConnectedAnecdoteForm = connect(
	null,
	mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm