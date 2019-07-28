import React from "react"
import {Button, Form} from "react-bootstrap"
import {connect} from "react-redux"
import {errorChange} from "../reducers/errorReducer"
import {notificationChange} from "../reducers/notificationReducer"
import {vote, removeBlog, updateBlog} from "../reducers/blogReducer"

//Component with which to edit some parts of existing blogs
const Editform = (props) => {
	const blog = props.blog

	const submitHandler = async (event) => {
		event.preventDefault()


		//I'm too lazy to make extensive error checks for the put operation
		//so this will input the original values if none are given by the user on submit
		const updatedAuthor = event.target.author.value.trim() === "" ? blog.author : event.target.author.value
		const updatedUrl = event.target.url.value.trim() === "" ? blog.url : event.target.url.value

		const blogObject = {
			title: blog.title,
			author: updatedAuthor,
			url: updatedUrl.search("https://") === -1 ? "https://" + updatedUrl : updatedUrl,
			likes: blog.likes,
			user: {
				id: blog.user.id,
				name: blog.user.name,
				username: blog.user.username
			},
			id: blog.id,
			comments: blog.comments
		}
		event.target.author.value = ""
		event.target.url.value = ""

		try {
			await props.updateBlog(blogObject)
			props.notificationChange(`${blog.title} updated succesfully!`, 5)
			props.setShowEdit(false)
		}

		catch {
			if (updatedAuthor.length > 30 || updatedUrl.length > 100) {
				props.errorChange("At least one field value is longer than the allowed maximum (Author = 30, Url = 100)", 7)
			}
		}
	}

	return(
		<div>
			<h4>Edit blog "{blog.title}"</h4>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label>New Author:</Form.Label>
					<Form.Control
						type="text"
						name="author"
					/>
					<Form.Label>New URL:</Form.Label>
					<Form.Control
						type="text"
						name="url"
					/>
					<hr />
					<Button variant="primary" type="submit">Save</Button> <Button type="reset" >Reset</Button>
				</Form.Group>
			</Form>
			<br />
			<Button onClick={() => props.setShowEdit(false)}>Cancel</Button>
		</div>
	)
}

const mapDispatchToProps = {
	vote,
	errorChange,
	removeBlog,
	updateBlog,
	notificationChange
}

export default connect(null, mapDispatchToProps)(Editform)