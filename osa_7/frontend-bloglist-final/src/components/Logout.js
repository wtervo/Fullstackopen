import React from "react"
import {connect} from "react-redux"
import {resetLogin} from "../reducers/loginReducer"
import {Button} from "react-bootstrap"
import {withRouter} from "react-router-dom"

//This component renders the logged user's information and the logout button on top of every page
const Logout = (props) => {
	const handleLogout = (event) => {
		//Removal of login store, localStorage and user status hook when logging out
		event.preventDefault()
		window.localStorage.removeItem("loggedBlogappUser")
		props.resetLogin()
		props.setUser(null)
		props.history.push("/login")
	}

	return(
		<div>
			<p class="text-right">Logged in as {props.user.username} ({props.user.name}) <Button size="sm" onClick={handleLogout}>Logout</Button></p>
			<br />
		</div>
	)
}

const mapDispatchToProps = {
	resetLogin
}

export default withRouter(connect(null, mapDispatchToProps)(Logout))