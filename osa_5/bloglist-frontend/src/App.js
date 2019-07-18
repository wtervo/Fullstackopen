import React, {useState, useEffect} from 'react'
import "./index.css"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Errormessage from "./components/Errormessage"
import LoginForm from "./components/LoginForm"
import BlogForm from './components/BlogForm';
import loginService from "./services/login"
import blogService from "./services/blogs"


const App = () => {
	const [blogs, setBlogs] = useState([]) 
	const [errorMessage, setErrorMessage] = useState(null)
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [monitorChange, setChange] = useState(Math.random()) //this hook is for rerendering the bloglist immediately after post or delete
	const [user, setUser] = useState(null)
	const [newBlogVisible, setNewBlogVisible] = useState(false)

	useEffect(() => {
		blogService
			.getAll().then(initialBlogs => {
				setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
			})
	}, [monitorChange])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])


	const addBlog = (event) => {
		event.preventDefault()
		const blogObject = {
			title: event.target[0].value,
			author: event.target[1].value,
			url: event.target[2].value,
			likes: event.target[3].value === "" ? 0 : event.target[3].value
		}
		blogService
			.create(blogObject)
			.then(data => {
				setBlogs(blogs.concat(data))
				setNotificationMessage(`A new blog "${blogObject.title}" by ${blogObject.author} has been added to the collection`)
				setChange(Math.random())
				setTimeout(() => {
					setNotificationMessage(null)
				}, 4000)
			})
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		const username = event.target[0].value
		const password = event.target[1].value
		console.log("Logging in with", username, password)
		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				"loggedBlogappUser", JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setNotificationMessage(`Succesfully logged in. Welcome back, ${username}!`)
			setTimeout(() => {
				setNotificationMessage(null)
			}, 3000)
		}
		catch {
			setErrorMessage("Invalid username or password")
			setTimeout(() => {
				setErrorMessage(null)
			}, 4000)
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem("loggedBlogappUser")
		setUser(null)
	}

	const blogForm = () => {
		const hideWhenVisible = {display: newBlogVisible ? "none" : ""}
		const showWhenVisible = {display: newBlogVisible ? "" : "none"}
		return(
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setNewBlogVisible(true)}>Add a new blog</button>
				</div>
				<div style={showWhenVisible}>
					<BlogForm
						addBlog={addBlog}
					/>
					<button onClick={() => setNewBlogVisible(false)}>Cancel</button>
				</div>
			</div>
		)
	}

	return (
		<div>
			<h1>Bloglist</h1>

			<Errormessage message={errorMessage} />
			<Notification message={notificationMessage} />

			{user === null ?
				<LoginForm
					handleLogin={handleLogin}
				/> :
				<div>
					<p>Logged in as {user.username} ({user.name}) <button onClick={handleLogout}>Logout</button></p>
					{blogForm()}
					<div>
						<h2>Blogs</h2>
						<h3><b>Click a blog's name to show more details</b></h3>
						{blogs.map(blog =>
							<Blog blog={blog} setErrorMessage={setErrorMessage} setChange={setChange}/>
						)}
					</div>
				</div>
			}

		</div>
	)
}

export default App