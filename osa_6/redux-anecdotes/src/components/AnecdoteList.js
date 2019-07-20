import React from "react"
import {vote} from "../reducers/anecdoteReducer"
import {notificationChange} from "../reducers/notificationReducer"
import {connect} from "react-redux"

const AnecdoteList = (props) => {

	const handleVote = (anecdote) => {
		props.vote(anecdote.id)
		props.notificationChange(
			`You voted for "${anecdote.content}"`
		)
		setTimeout(() => {
			props.notificationChange(null)
		}, 5000)
	}

	return(
		<div>
			{props.visibleAnecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
            has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

const anecdotesToShow = ({anecdotes, filter}) => {

	if (filter === "") {
		return anecdotes
	}
	else {
		const filteredAnecdotes = anecdotes.map(anecdote => {
			const searchResult = anecdote.content.search(filter)
			if (searchResult !== -1) {
				return anecdote
			}
			return null
		}).filter(anecdote => anecdote !== null)
		return filteredAnecdotes
	}
}

const mapStateToProps = (state) => {
	return {
		visibleAnecdotes : anecdotesToShow(state)
	}
}

const mapDispatchToProps = {
	vote,
	notificationChange
}

const ConnectedAnecdoteList = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList