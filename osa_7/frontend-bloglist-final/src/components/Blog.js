import React, {useState} from "react"
import blogService from "../services/blogs"
import {Button} from "react-bootstrap"
import {connect} from "react-redux"
import {errorChange} from "../reducers/errorReducer"


const Blog = (props) => {
	const blog = props.blog
	const setChange = props.setChange
	console.log(props.errorChange)
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
				<div>
					<hr />
					<p class="text-right"><Button variant="danger" onClick={() => deleteHandler(blog)}>Remove</Button></p>
				</div>
			)
		}
	}

	const deleteHandler = async (blog) => {
		if (window.confirm(`Do you want to remove "${blog.title}" by ${blog.author}? This action cannot be undone.`)) {
			await blogService.remove(blog.id)
			props.errorChange(`"${blog.title}" by ${blog.author} removed`, 7)
			setBlogDetail(false)
			setChange(Math.random())
		}
	}
	if (blogDetail) {
		return(
			<tr key={blog.id}>
				<td style={blogStyle}>
					<b onClick={() => setBlogDetail(false)}>Less details</b>
					<p>"{blog.title}" by {blog.author}</p>
					<p>Likes: {blogLikes}</p>
					<p>URL: <a href={blog.url}>{blog.url}</a></p> {/*links obviously are fake anyway, but I did not manage to get them to work externally*/}
					<p>Added by: {blog.user.username}</p>
				</td>
				<td>
					{blog.author}
					<br />
					<br />
					<p class="text-right"><Button variant="success" onClick={() => likeHandler(blog)}>Like</Button></p>
					{deleteButton(blog)}
				</td>
			</tr>
		)
	}
	else {
		return (
			<tr key={blog.id}>
				<td>
					<b onClick={() => setBlogDetail(true)}>{blog.title}</b>
				</td>
				<td>
					{blog.author}
				</td>
			</tr>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.error
	}
}

const mapDispatchToProps = {
	errorChange,
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)