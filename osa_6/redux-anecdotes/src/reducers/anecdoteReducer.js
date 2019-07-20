import anecdoteService from "../services/anecdotes"

export const vote = anecdote => {
	return async dispatch => {
		const votedAnecdote = await anecdoteService.updateVote(anecdote)
		dispatch({
			type: "VOTE",
			data: votedAnecdote
		})
	}
}

export const addAnecdote = content => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: "ADD",
			data: newAnecdote,
		})
	}
}

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: "INIT_ANECDOTES",
			data: anecdotes,
		})
	}
}

const anecdoteReducer = (state = [], action) => {
	// console.log("state now: ", state)
	// console.log("action", action)
	switch (action.type) {
	case "VOTE":
		const id = action.data.id
		const anecdoteToChange = state.find(n => n.id === id)
		const changedAnecdote = {
			...anecdoteToChange,
			votes: anecdoteToChange.votes + 1
		}
		return state.map(anecdote =>
			anecdote.id !== id ? anecdote : changedAnecdote
		).sort((a, b) => {
			return b.votes - a.votes
		})
	case "ADD":
		const anecdote = action.data.content
		const anecdoteObject = {
			content: anecdote,
			id: action.data.id,
			votes: 0
		}
		return state.concat(anecdoteObject)
	case "INIT_ANECDOTES":
		return action.data.sort((a, b) => {
			return b.votes - a.votes
		})
	default:
		return state
	}
}

export default anecdoteReducer