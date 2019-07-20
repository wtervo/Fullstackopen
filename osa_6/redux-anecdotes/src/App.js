import React, {useEffect} from "react"
import {connect} from "react-redux"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import {initializeAnecdotes} from "./reducers/anecdoteReducer"

const App = (props) => {
	useEffect(() => {
		props.initializeAnecdotes()
	}, [])

	return(
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<AnecdoteForm />
			<p></p>
			<Filter />
			<p></p>
			<p></p>
			<AnecdoteList />
		</div>
	)
}

export default connect(null, {initializeAnecdotes})(App)