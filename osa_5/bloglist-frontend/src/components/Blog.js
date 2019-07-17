import React, {useState} from "react"
import blogService from "../services/blogs"

const Blog = ({blog, setErrorMessage, setChange}) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5
	}

	const [blogDetail, setBlogDetail] = useState(false)
	const [blogLikes, setBlogLikes] = useState(blog.likes)

	const likeHandler = async (blog) => {
		const updateObject = {
			id: blog.id,
			user: blog.user.id,
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blogLikes + 1
		}
		const returnedBlog = await blogService.update(updateObject)
		setBlogLikes(returnedBlog.likes)
	}

	const deleteButton = (blog) => {
		const loggedUser = JSON.parse(window.localStorage.getItem("loggedBlogappUser"))
		if (loggedUser.username === blog.user.username) {
			return(
				<p><button onClick={() => deleteHandler(blog)}>Remove</button></p>
			)
		}
	}

	const deleteHandler = async (blog) => {
		if (window.confirm(`Do you want to remove "${blog.title}" by ${blog.author}?`)) {
			await blogService.remove(blog.id)
			setErrorMessage(`"${blog.title}" by ${blog.author} removed`)
			setBlogDetail(false)
			setChange(Math.random())
			setTimeout(() => {
				setErrorMessage(null)
			}, 3000)
		}
	}
	if (blogDetail) {
		return(
			<div style={blogStyle}>
				<b onClick={() => setBlogDetail(false)}>Less details</b>
				<p>"{blog.title}" by {blog.author}</p>
				<p>URL: <a href={blog.url}>{blog.url}</a></p> {/*links obviously are fake anyway, but I did not manage to get them to work externally*/}
				<p>Likes: {blogLikes} <button onClick={() => likeHandler(blog)}>Like</button></p>
				<p>Added by: {blog.user.username}</p>
				{deleteButton(blog)}
			</div>
		)
	}
	else {
		return (
			<div style={blogStyle}>
				<b onClick={() => setBlogDetail(true)}>{blog.title}</b> - {blog.author}
			</div>
		)
	}
}

export default Blog