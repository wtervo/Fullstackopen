import React from "react"
import {Form, Button} from "react-bootstrap"
import {connect} from "react-redux"
import {addBlog} from "../reducers/blogReducer"
import {notificationChange} from "../reducers/notificationReducer"
import {errorChange} from "../reducers/errorReducer"

const BlogForm = (props) => {

	const submitHandler = async (event) => {
		event.preventDefault()
		
		const loggedUser = JSON.parse(window.localStorage.getItem("loggedBlogappUser"))
		const urlValue = event.target[2].value
		const blogObject = {
			title: event.target[0].value,
			author: event.target[1].value,
			url: urlValue.search("https://") === -1 ? "https://" + urlValue : urlValue,
			likes: event.target[3].value === "" ? 0 : parseInt(event.target[3].value),
			user: {
				id: loggedUser.id,
				name: loggedUser.name,
				username: loggedUser.username
			}
		}
		event.target.title.value = ""
		event.target.author.value = ""
		event.target.url.value = ""
		event.target.likes.value = ""

		try {
			await props.addBlog(blogObject)
			props.notificationChange(`A new blog "${blogObject.title}" by ${blogObject.author} has been added to the collection`, 5)
		}

		catch {
			if (blogObject.title === "" || blogObject.author === "" || blogObject.url === "")
				props.errorChange("One of the required fields is missing", 7)
			else if (props.blogs.find(blog => blogObject.title === blog.title))
				props.errorChange(`A blog titled "${blogObject.title}" is already in the collection`, 7)
			else if (typeof blogObject.likes !== "number" || blogObject.likes < 0 || !Number.isInteger(blogObject.likes))
				props.errorChange("Likes has to be an integer valued 0 or greater", 7)
			else if (blogObject.title.length > 100 || blogObject.author.length > 30 || blogObject.url.length > 100)
				props.errorChange("At least one field value is longer than the allowed maximum (Title = 100, Author = 30, Url = 100)", 7)
			else if (blogObject.likes > 1e+10)
				props.errorChange("Maximum allowed likes is 10 000 000 000 (ten billion)", 7)
		}
	}

	return (
		<>
		<h2>Add a new blog</h2>
		<br />
		<Form onSubmit={submitHandler}>
			<Form.Group>
				<Form.Label>Title:</Form.Label>
				<Form.Control
					type="text"
					name="title"
				/>
				<Form.Label>Author:</Form.Label>
				<Form.Control
					type="text"
					name="author"
				/>
				<Form.Label>URL:</Form.Label>
				<Form.Control
					type="text"
					name="url"
				/>
				<Form.Label>Likes (optional):</Form.Label>
				<Form.Control
					type="text"
					name="likes"
				/>
				<hr />
				<Button variant="primary" type="submit">Save</Button> <Button type="reset" >Reset</Button>
			</Form.Group>
		</Form>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}
}

const mapDispatchToProps = {
	addBlog,
	notificationChange,
	errorChange
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)