import React, {useState, useEffect} from "react"
import blogService from "../services/blogs"
import Editform from "./Editform"
import {Button, Table, Form} from "react-bootstrap"
import {connect} from "react-redux"
import {errorChange} from "../reducers/errorReducer"
import {notificationChange} from "../reducers/notificationReducer"
import {vote, removeBlog, updateBlog} from "../reducers/blogReducer"
import {Link, withRouter} from "react-router-dom"

//Component which displays the page for a single blog and handles all the actions
//possible in its

//This component turned up way too bloated and complicated
//Should slice it into smaller components, but I'm sure I will break everything if I do so

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
			likes: blog.likes + 1,
			comments: blog.comments
		}
		props.vote(updateObject)
	}

	const [comments, setComments] = useState([])
	const [commentBoxVisible, setCommentBoxVisible] = useState(false)
	const [showEdit, setShowEdit] = useState(false)

	useEffect(() => {
		const commentArray = async (blog) => {
			const foundComments = await blogService.getComments(blog)
			if (foundComments.length !== 0) {
				setComments(foundComments)
			}
		}
		if (blog) {
			commentArray(blog)
		}
	}, [blog, props.notification, props.error])
	//Comments are loaded when blog is found (on first load) and when notification/error change
	//ie. when adding comments or editing the blog

	const deleteAndEditButtons = (blog) => {
		//The buttons are only visible to the user that added the blog in question
		const loggedUser = JSON.parse(window.localStorage.getItem("loggedBlogappUser"))
		if (loggedUser.username === blog.user.username) {
			return(
				<div>
					<hr />
					<p class="text-center"><Button variant="info" onClick={() => setShowEdit(true)}>Edit</Button></p>
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

	const submitHandler = async (event) => {
		event.preventDefault()
		const newComment = event.target.comment.value.trim()
		const previousComments = comments
		const blogObject = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes,
			user: {
				id: blog.user.id,
				name: blog.user.name,
				username: blog.user.username
			},
			id: blog.id,
			comments: previousComments.concat(newComment)
		}

		event.target.comment.value = ""
		try {
			await props.updateBlog(blogObject)
			props.notificationChange("Comment added!", 5)
			setComments(previousComments.concat(newComment)) //This hook updates the front's bloglist after a comment has been added
			setCommentBoxVisible(false)
		}
		catch {
			if (newComment.length < 1) {
				props.errorChange("Comment was either empty or consisted only of empty spaces", 5)
			}
			else if (newComment.length > 250) {
				props.errorChange("Comment is longer than the allowed maximum", 5)
			}
		}
	}

	const commentBox = () => {
		//Comment box is not visible until a button has been pressed
		//Automatically hides when a comment has been submitted
		const hideWhenVisible = {display: commentBoxVisible ? "none" : ""}
		const showWhenVisible = {display: commentBoxVisible ? "" : "none"}
		return(
			<div>
				<div style={hideWhenVisible}>
					<Button onClick={() => setCommentBoxVisible(true)}>Add a comment</Button>
				</div>
				<div style={showWhenVisible}>
					<Form onSubmit={submitHandler}>
						<Form.Group>
							<Form.Label>Write a comment (max. 250 letters)</Form.Label>
							<Form.Control type="text" name="comment" as="textarea" rows="3" />
							<hr />
							<Button variant="primary" type="submit">Submit</Button> <Button type="reset" >Reset</Button>
						</Form.Group>
					</Form>
					<br />
					<Button onClick={() => setCommentBoxVisible(false)}>Cancel</Button>
				</div>
			</div>
		)
	}

	if (blog === undefined) {
		return null
	}

	return(
		<div>
			<br />
			<h3>Blog ID: {blog.id}</h3>
			<br />
			{showEdit ?
			<div>
				<Editform blog={blog} setShowEdit={setShowEdit}/>
			</div>
			:
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
			}
			<br />
			<h4>Leave a comment</h4>
			<br />
			{commentBox()}
			<br />
			<h4>Comments:</h4>
			<br />
			{comments.length === 0 ?
				<div>
					<big>No comments for this blog yet. Be the first to submit one!</big>
				</div>
			:
				<div>
					{comments.map(comment => {
						return (
							<div style={blogStyle} key={comments.indexOf(comment)}>{comment}</div>
						)
					})}
				</div>
			}
			<br />
			<Link to="/blogs"><Button>To Blogs</Button></Link>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const blog = ownProps.blog
	return {
		blog,
		error: state.error,
		notification: state.notification
	}
}

const mapDispatchToProps = {
	vote,
	errorChange,
	removeBlog,
	updateBlog,
	notificationChange
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))