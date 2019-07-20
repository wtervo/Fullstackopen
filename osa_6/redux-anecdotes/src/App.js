import React from "react"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import Filter from "./components/Filter"

const App = () => {
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

export default App