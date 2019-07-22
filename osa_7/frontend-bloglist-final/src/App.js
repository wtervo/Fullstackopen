import React, {useState, useEffect} from 'react'
import "./index.css"
import {Table, Button} from "react-bootstrap"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Errormessage from "./components/Errormessage"
import Footer from "./components/Footer"
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
		const urlValue = event.target[2].value
		const blogObject = {
			title: event.target[0].value,
			author: event.target[1].value,
			url: urlValue.search("https://") === -1 ? "https://" + urlValue : urlValue,
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
				}, 5000)
			})
			.catch(() => {
				if (blogObject.title === "" || blogObject.author === "" || blogObject.url === "")
					setErrorMessage("One of the required fields is missing")
				else if (typeof blogObject.likes !== "number" || blogObject.likes < 0 || !Number.isInteger(blogObject.likes))
					setErrorMessage("Likes has to be an integer valued 0 or greater")
				else if (blogObject.title.length > 100 || blogObject.author.length > 30 || blogObject.url.length > 100)
					setErrorMessage("At least one field value is longer than the allowed maximum (Title = 100, Author = 30, Url = 100)")
				else if (blogObject.likes > 1e+10)
					setErrorMessage("Maximum allowed likes is 10 000 000 000 (ten billion)")
				setTimeout(() => {
					setErrorMessage(null)
				}, 7000)
			})
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		const username = event.target[0].value
		const password = event.target[1].value
		event.target[1].value = ""
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
			}, 5000)
		}
		catch {
			setErrorMessage("Invalid username or password")
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
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
					<Button onClick={() => setNewBlogVisible(true)}>Add a new blog</Button>
				</div>
				<div style={showWhenVisible}>
					<BlogForm
						addBlog={addBlog}
					/>
					<Button onClick={() => setNewBlogVisible(false)}>Cancel</Button>
				</div>
			</div>
		)
	}

	return (
		<div class="container">
			<h1>Bloglist</h1>

			<Errormessage message={errorMessage} />
			<Notification message={notificationMessage} />

			{user === null ?
				<LoginForm
					handleLogin={handleLogin}
				/> :
				<div>
					<p>Logged in as {user.username} ({user.name}) <Button onClick={handleLogout}>Logout</Button></p>
					{blogForm()}
					<br />
					<br />
					<div>
						<h2>Blogs</h2>
						<br />
						<h4><b>Click a name to show more details about the blog</b></h4>
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
								{blogs.map(blog =>
									<Blog blog={blog} setErrorMessage={setErrorMessage} setChange={setChange}/>
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

export default App