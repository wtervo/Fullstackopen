import React from "react"
import PropTypes from "prop-types"
import useField from "../hooks/index"

const LoginForm = ({handleLogin}) => {

	const user = useField("text")
	const pw = useField("password")

	const resetHandler = () => {
		user.resetField()
		pw.resetField()
	}

	const submitHandler = (event) => {
		handleLogin(event)
		resetHandler()
	}

	return(
		<>
		<h2>Login to the application</h2>
		<form onSubmit={submitHandler}>
			<div>
			Username: 
				<input {...user} />
			</div>
			<div>
			Password: 
				<input {...pw} />
			</div>
			<button type="submit">Login</button>
			
		</form>
		<button onClick={resetHandler}>Reset</button>
		</>
	)
}

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired
}

export default LoginForm