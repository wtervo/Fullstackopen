import React, {useState, useEffect} from "react"
import "./index.css"
import {Table, Button} from "react-bootstrap"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Errormessage from "./components/Errormessage"
import Footer from "./components/Footer"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import {connect} from "react-redux"
import {notificationChange} from "./reducers/notificationReducer"
import {errorChange} from "./reducers/errorReducer"
import {initialBlogs} from "./reducers/blogReducer"
import {resetLogin} from "./reducers/loginReducer"


const App = (props) => {
	const [newBlogVisible, setNewBlogVisible] = useState(false)
	const [user, setUser] = useState(null)

	useEffect(() => {
		//This effect hook is called whenever the props change, ie. every time the store is altered in any way.
		//This is nice as the list of blogs is automatically refreshed when adding/deleting stuff
		props.initialBlogs()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [props.login]) //This effect hook is called every time the login info in the store changes

	const handleLogout = (event) => {
		//Removal of login store, localStorage and user status hook when logging out
		event.preventDefault()
		window.localStorage.removeItem("loggedBlogappUser")
		props.resetLogin()
		setUser(null)
	}

	const blogForm = () => {
		//Some shenanigans which toggle the visibility of the blog adding form
		const hideWhenVisible = {display: newBlogVisible ? "none" : ""}
		const showWhenVisible = {display: newBlogVisible ? "" : "none"}
		return(
			<div>
				<div style={hideWhenVisible}>
					<Button onClick={() => setNewBlogVisible(true)}>Add a new blog</Button>
				</div>
				<div style={showWhenVisible}>
					<BlogForm />
					<Button onClick={() => setNewBlogVisible(false)}>Cancel</Button>
				</div>
			</div>
		)
	}

	return (
		<div class="container">
			<h1>Bloglist</h1>
			<Errormessage />
			<Notification />

			{user === null ?
				//TODO: If a user is logged in and refreshes the page, LoginForm is rendered unnecessarily very briefly
				//because the app takes time to update the user variable with the localStorage information.
				//Would very much like to stop this from happening, but currently out of ideas.
				<LoginForm />
				:
				<div>
					<p>Logged in as {user.username} ({user.name}) <Button onClick={handleLogout}>Logout</Button></p>
					{blogForm()}
					<br />
					<br />
					<div>
						<h2>Blogs</h2>
						<br />
						<h4><b>Click a name to view more details about the blog</b></h4>
						<br />
						<Table striped>
							<thead style={{
								paddingTop: 10,
								paddingLeft: 2,
								border: "solid",
								borderWidth: 3,
								marginBottom: 5
							}}>
								<tr>
									<th>BLOG'S NAME</th>
									<th>AUTHOR</th>
								</tr>
							</thead>
							<tbody>
								{props.blogs.map(blog =>
									<Blog blog={blog}/>
								)}
							</tbody>
						</Table>
					</div>
				</div>
			}
			<Footer />
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		login: state.login,
		error: state.error
	}
}

const mapDispatchToProps = {
	initialBlogs,
	resetLogin,
	notificationChange,
	errorChange
}

export default connect(mapStateToProps, mapDispatchToProps)(App)