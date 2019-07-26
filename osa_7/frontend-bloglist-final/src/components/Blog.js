import React from "react"
import {Button, Table} from "react-bootstrap"
import {connect} from "react-redux"
import {errorChange} from "../reducers/errorReducer"
import {vote, removeBlog} from "../reducers/blogReducer"
import {Link, withRouter} from "react-router-dom"

const Blog = (props) => {
	const blog = props.blog
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5
	}

	const likeHandler = async (blog) => {
		const updateObject = {
			id: blog.id,
			user: blog.user.id,
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1
		}
		props.vote(updateObject)
	}

	const deleteAndEditButtons = (blog) => {
		const loggedUser = JSON.parse(window.localStorage.getItem("loggedBlogappUser"))
		if (loggedUser.username === blog.user.username) {
			return(
				<div>
					<hr />
					<p class="text-center"><Button variant="info">Edit</Button></p>
					<hr />
					<p class="text-center"><Button variant="danger" onClick={() => deleteHandler(blog)}>Remove</Button></p>
				</div>
			)
		}
	}



	const deleteHandler = async (blog) => {
		if (window.confirm(`Do you want to remove "${blog.title}" by ${blog.author}? This action cannot be undone.`)) {
			await props.removeBlog(blog)
			props.errorChange(`"${blog.title}" by ${blog.author} removed`, 7)
			props.history.push("/blogs")
		}
	}

	if (blog === undefined) {
		return null
	}

	return(
		<div>
			<br />
			<h3>Blog ID: {blog.id}</h3>
			<br />
			<Table>
				<tbody>
					<tr key={blog.id}>
						<td style={blogStyle}>
							<p>Title: {blog.title}</p>
							<p>Author: {blog.author}</p>
							<p>URL: <a href={blog.url}>{blog.url}</a></p>
							<p>Likes: {blog.likes}</p>
							<p>Added by: <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link></p>
						</td>
						<td style={blogStyle}>
							<p class="text-center"><Button variant="success" size="lg" onClick={() => likeHandler(blog)}>Like</Button></p>
							{deleteAndEditButtons(blog)}
						</td>
					</tr>
				</tbody>
			</Table>
			<br />
			<h4>Leave a comment</h4>
			<br />
			<h4>Comments:</h4>
			<br />
			<br />
			<Link to="/blogs"><Button>To Blogs</Button></Link>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const blog = ownProps.blog
	return {
		blog,
		error: state.error
	}
}

const mapDispatchToProps = {
	vote,
	errorChange,
	removeBlog,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))