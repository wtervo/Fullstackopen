import React from "react"
import {Form, Button} from "react-bootstrap"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {Link} from "react-router-dom"
import {addUser} from "../reducers/userReducer"
import {notificationChange} from "../reducers/notificationReducer"
import {errorChange} from "../reducers/errorReducer"

const Createaccount = (props) => {

	const submitHandler = async (event) => {
		event.preventDefault()
		const username = event.target.username.value.trim()
		//If name is not given, a default value is submitted
		const name = event.target.name.value.trim() === "" ? "NoNameGiven" : event.target.name.value
		const password = event.target.password.value.trim()
		const password2 = event.target.password2.value.trim()

		event.target.username.value = ""
		event.target.name.value = ""
		event.target.password.value = ""
		event.target.password2.value = ""

		if (password !== password2) {
			props.errorChange("The passwords don't match", 5)
		}
		else {
			const newUserObject = {
				username,
				name,
				password
			}

			try {
				await props.addUser(newUserObject)
				props.notificationChange(`New account "${username}" created successfully!`, 5)
				props.history.push("/login")
			}

			catch {
				
				if (username === "" || password === "") {
					props.errorChange("One of the required fields is missing", 5)
				}
				else if (props.users.filter(user => user.username === username).length > 0) {
					props.errorChange(`Username "${username}" is already in use`, 5)
				}
				else if (username.length > 20 || username.length < 4) {
					props.errorChange("Username is either too short or too long", 5)
				}
				else if (password.length > 25 || password.length < 6) {
					props.errorChange("Password is either too short or too long", 5)
				}
			}
		}
	}

	return(
		<div>
			<br />
			<h4><b>IMPORTANT: </b>User passwords are saved as encrypted, so the actual password is not visible to anyone</h4>
			<br />
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label>Username (4-20 symbols):</Form.Label>
					<Form.Control
						type="text"
						name="username"
					/>
					<Form.Label>Name (optional):</Form.Label>
					<Form.Control
						type="text"
						name="name"
					/>
					<Form.Label>Password (6-25 symbols):</Form.Label>
					<Form.Control
						type="password"
						name="password"
					/>
					<Form.Label>Repeat password:</Form.Label>
					<Form.Control
						type="password"
						name="password2"
					/>
					<hr />
					<Button variant="primary" type="submit">Submit</Button> <Button type="reset" >Reset</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		users: state.users,
	}
}

const mapDispatchToProps = {
	addUser,
	notificationChange,
	errorChange
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Createaccount))