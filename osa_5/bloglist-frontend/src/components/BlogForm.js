import React from "react"
import useField from "../hooks/index"

const BlogForm = ({addBlog}) => {

	const title = useField("text")
	const author = useField("text")
	const url = useField("text")
	const likes = useField("text")

	const resetHandler = () => {
		title.resetField()
		author.resetField()
		url.resetField()
		likes.resetField()
	}

	const submitHandler = (event) => {
		addBlog(event)
		resetHandler()
	}

	return (
		<>
		<h2>Add a new blog</h2>
		<form onSubmit={submitHandler}>
			<p>Title: <input {...title} /></p>
			<p>Author: <input {...author} /></p>
			<p>URL: <input {...url} /></p>
			<p>Likes: <input {...likes} /></p>
			<button type="submit">Save</button>
		</form>
		<button onClick={resetHandler}>Reset</button>
		</>
	)
}

export default BlogForm