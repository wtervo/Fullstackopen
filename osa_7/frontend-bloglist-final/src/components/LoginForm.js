import React from "react"
import {connect} from "react-redux"
import {Form, Button} from "react-bootstrap"
import {changeLogin} from "../reducers/loginReducer"
import {errorChange} from "../reducers/errorReducer"
import {notificationChange} from "../reducers/notificationReducer"
import {withRouter} from "react-router-dom"

const LoginForm = (props) => {

	const submitHandler = async (event) => {
		event.preventDefault()
		const username = event.target[0].value
		const password = event.target[1].value
		event.target[1].value = ""
		console.log("Logging in with", username, password)
		try {
			await props.changeLogin(username, password)
			props.notificationChange(`Successfully logged in. Welcome back, ${username}!`, 5)
			props.history.push("/")
		}
		catch {
			props.errorChange("Invalid username or password", 5)
		}
	}

	return(
		<>
		<br />
		<h2>Login to the application</h2>
		<br />
		<br />
		<Form onSubmit={submitHandler}>
			<Form.Group>
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type="text"
					name="username"
				/>
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type="password"
				/>
				<hr />
				<Button variant="primary" type="submit">Login</Button> <Button type="reset" >Reset</Button>
			</Form.Group>
		</Form>
		</>
	)
}

const mapDispatchToProps = {
	changeLogin,
	errorChange,
	notificationChange
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))