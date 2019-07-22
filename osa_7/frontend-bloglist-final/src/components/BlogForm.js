import React from "react"
import {Form, Button} from "react-bootstrap"

const BlogForm = ({addBlog}) => {

	const submitHandler = (event) => {
		addBlog(event)
		event.target.title.value = ""
		event.target.author.value = ""
		event.target.url.value = ""
		event.target.likes.value = ""
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
				<Form.Label>Url:</Form.Label>
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

export default BlogForm