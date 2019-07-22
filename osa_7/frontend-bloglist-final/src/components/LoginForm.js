import React from "react"
import PropTypes from "prop-types"
import {Form, Button} from "react-bootstrap"

const LoginForm = ({handleLogin}) => {

	const submitHandler = (event) => {
		handleLogin(event)
	}

	return(
		<>
		<h2>Login to the application</h2>
		<br />
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

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired
}

export default LoginForm