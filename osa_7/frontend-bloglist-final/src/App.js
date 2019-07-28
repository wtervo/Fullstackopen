import React, {useState, useEffect} from "react"
import "./index.css"
import {Button, Navbar, Nav} from "react-bootstrap"
import Notification from "./components/Notification"
import Errormessage from "./components/Errormessage"
import Home from "./components/Home"
import Blog from "./components/Blog"
import Users from "./components/Users"
import User from "./components/User"
import Createaccount from "./components/Createaccount"
import Footer from "./components/Footer"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Blogtable from "./components/Blogtable"
import Logout from "./components/Logout"
import blogService from "./services/blogs"
import {connect} from "react-redux"
import {initialBlogs} from "./reducers/blogReducer"
import {initialUsers} from "./reducers/userReducer"
import {
	BrowserRouter as Router, Route, Link
} from "react-router-dom"

//This component ended up quite bloated, despite my best attempts of avoiding it from happening
//I suppose the routes should have been included in their own subcomponent in a separate file
const App = (props) => {
	const [user, setUser] = useState(null)
	const [newBlogVisible, setNewBlogVisible] = useState(false)

	useEffect(() => {
		//This effect hook is called whenever the props change, ie. every time the store is altered in any way.
		//This is nice as the list of blogs is automatically refreshed when adding/deleting stuff
		props.initialBlogs()
		props.initialUsers()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [props.login]) //This effect hook is called every time the login info in the store changes

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
					<BlogForm setNewBlogVisible={setNewBlogVisible}/>
					<Button onClick={() => setNewBlogVisible(false)}>Cancel</Button>
				</div>
			</div>
		)
	}

	const userById = (id) =>
		props.users.find(user => user.id === id)
	const blogById = (id) =>
		props.blogs.find(blog => blog.id === id)

	const totalBlogs = props.blogs.length
	const activeUsers = props.users.filter(user => user.blogs.length !== 0)
	const padding = {padding: 20}

	return (
		<div class="container">
			<Router>
				{user === null ?
				//TODO: If a user is logged in and refreshes the page, LoginForm is rendered unnecessarily very briefly
				//because the app takes time to update the user variable with the localStorage information.
				//Would very much like to stop this from happening, but currently out of ideas.
					<div>
						<br />
						<br />
						<h1 class="text-center">Welcome to my React bloglist app!</h1>
						<br />
						<h4 class="text-center"><big><Link to="/login"><u>Login</u></Link> to the app or <Link to="/createaccount"><u>create</u></Link> an account.</big></h4>
						<br />
						<p class="text-center"><big><b>The database currently has {totalBlogs} blogs by {activeUsers.length} users!</b></big></p>
						<br />
						<p class="text-center"><big><b>A total of {props.users.length} users have registered for the app!</b></big></p>
						{/*The /login path is redundant, because unlogged user sees a shitty page and has to manually move to the login page
						and after the login, is redirected back to the home page. Would be better if the login was rendered on the homepage
						when the visitor is not logged in, but since this system is already in place and served as a nice practice to implement,
						I'm going to let this pass.*/}
						<Route exact path="/login" render={() =>
							<div>
								<Errormessage />
								<Notification />
								<LoginForm />
							</div>
						} />
						<Route exact path="/createaccount" render={() =>
							<div>
								<Errormessage />
								<Notification />
								<br />
								<h1 class="text-center">Create a new account</h1>
								<Createaccount />
							</div>
						} />
					</div>
					:
					<div>
						<div>
							{/*Navbar collapses when on a small screen, like phone*/}
							<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
								<Navbar.Toggle aria-controls="responsive-navbar-nav" />
								<Navbar.Brand href="/">Bloglist App</Navbar.Brand>
								<Navbar.Collapse id="responsive-navbar-nav">
									<Nav className="mr-auto">
										<Nav.Link href="#home" as="span">
											<Link style={padding} to="/">Home</Link>
										</Nav.Link>
										<Nav.Link href="#blogs" as="span">
											<Link style={padding} to="/blogs">Blogs</Link>
										</Nav.Link>
										<Nav.Link href="#users" as="span">
											<Link style={padding} to="/users">Users</Link>
										</Nav.Link>
										<Nav.Link href="#about" as="span">
											<Link style={padding} to="/about">About</Link>
										</Nav.Link>
									</Nav>
  							</Navbar.Collapse>
							</Navbar>
						</div>
						<br />
						<Logout user={user} setUser={setUser}/>
						<Route exact path="/" render={() =>
							<div>
								<Errormessage />
								<Notification />
								<h1 class="text-center">Bloglist React App</h1>
								<br />
								<p class="text-center"><big>Welcome to my React bloglist app!</big></p>
								<br />
								<br />
								<p class="text-center"><big>Feel free to add blogs and comments as you please</big></p>
								<p class="text-center"><big>All of the added stuff is pretty much unmoderated, so <b>don't take things too seriously</b>, as almost everything is nothing more than a stupid joke.</big></p>
								<br />
								<br />
								<p class="text-center"><big>Use the navigation bar on top to find more!</big></p>
								<Home user={user} setUser={setUser}/>
							</div>
						} />
						<Route exact path="/blogs" render={() =>
							<div>
								<Errormessage />
								<Notification />
								<h1 class="text-center">Bloglist</h1>
								<br />
								<p class="text-center"><big>The database currently has {totalBlogs} blogs by {activeUsers.length} users!</big></p>
								<br />
								{blogForm()}
								<br />
								<Blogtable/>
							</div>
						} />
						<Route exact path="/blogs/:id" render={({match}) =>
							<div>
								<Errormessage />
								<Notification />
								<Blog blog={blogById(match.params.id)} />
							</div>
						} />
						<Route exact path="/users" render={() =>
							<div>
								<Errormessage />
								<Notification />
								<h1 class="text-center">Users</h1>
								<Users />
							</div>
						} />
						<Route exact path="/users/:id" render={({match}) =>
							<User user={userById(match.params.id)} />
						} />
						<Route exact path="/about" render={() =>
							<div>
								<br />
								<h1 class="text-center">About the App</h1>
								<br />
								<br />
								<p>
									This app is a continuation of the work done for the Full Stack Open course by University of Helsinki.
									During the course, we were tasked to build an app for listing of blogs by different users piece by piece.
									The last task for the course was to pretty much improve the Bloglist App as much as possible with everything
									learned during the course and here is my best effort at doing so.
								</p>
								<br />
								<p>
									Although this app is heavily based on the tasks and material of the course, the vast majority of the code is
									original and done by me. Backend is done using Node.js and all of the data is stored on MongoDB. Frontend
									is built with React and Redux. Some relevant libraries for this project: Mongoose, Express, bcrypt,
									cors for backend and Axios, Redux, React-Router-DOM, React-Bootstrap for frontend.
								</p>
								<br />
								<p>
									If you wish to give feedback about the app, feel free to do so by sending me an email
									at <a href= "mailto: tervo.oskari@gmail.com">tervo.oskari@gmail.com</a>.
								</p>
								<br />
								<br />
								<br />
								<p>
									PS. I know very well how bad and bland the site looks, but unfortunately I lack the artistic vision and patience
									to improve it to a pleasing degree :|
								</p>
							</div>
						} />
					</div>
				}
			</Router>
			<Footer />
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		users: state.users,
		login: state.login,
	}
}

const mapDispatchToProps = {
	initialBlogs,
	initialUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)