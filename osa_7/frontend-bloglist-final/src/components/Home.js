import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {Table} from "react-bootstrap"

//Component which displays the home page
//Includes several subcomponents, which show most popular blogs etc.
const Home = (props) => {

	const topFive = (blogs) => {
		const sortedBlogs = blogs.sort((a, b) => {
			return b.likes - a.likes
		})
		const slicedBlogs = sortedBlogs.slice(0, 5)
		if (slicedBlogs === undefined) {
			return null
		}
		return (
			<div>
				<Table>
					<tbody>
						{slicedBlogs.map(blog => {
							return (
								<tr key={blog.id}>
									<td key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
									<td class="text-right">{blog.likes} likes</td>
								</tr>
							)
						})}
					</tbody>
				</Table>
			</div>
		)
	}

	const mostActive = (users) => {
		const sortedUsers = users.sort((a, b) => {
			return b.blogs.length - a.blogs.length
		})
		//Found it simpler to get the top user by .sort instead of Math.max() or similar
		//This component should be improved so that is shows multiple users if there are more than one
		//users with the same amount of added blogs as now it only shows the one which is first alphabetically
		const topUser = sortedUsers[0]

		if (topUser === undefined) {
			return null
		}
		return (
			<p><big><u><Link to={`/users/${topUser.id}`}>{topUser.username}</Link></u> with {topUser.blogs.length} added blogs!</big></p>
		)
	}

	const randomComments = (blogs) => {
		//Filter to an array with only blogs that have comments
		const blogsWithComments = blogs.filter(blog => blog.comments.length !== 0)
		const randomNumMax1 = blogsWithComments.length
		//Randomly choose one of the blogs
		const chosenBlog = Math.floor(Math.random() * randomNumMax1)
		//This if statement is to prevent crashing if blogs have not yet been loaded from store
		if (blogsWithComments[chosenBlog] === undefined) {
			return null
		}
		const randomNumMax2 = blogsWithComments[chosenBlog].comments.length
		//Randomly choose one of the comments in the chosen blog
		const chosenComment = Math.floor(Math.random() * randomNumMax2)
		const randomComment = blogsWithComments[chosenBlog].comments[chosenComment]
		if (randomComment === undefined) {
			return null
		}
		return (
			<tr>
				<td>
					{randomComment}
				</td>
				<td>
					<p>From <Link to={`/blogs/${blogsWithComments[chosenBlog].id}`}>{blogsWithComments[chosenBlog].title}</Link></p>
				</td>
			</tr>
		)
	}

	return (
		<div>
			<br />
			<br />
			<div>
				<h2>5 most popular blogs</h2>
				<br />
				{topFive(props.blogs)}
				<br />
				<h2>Most active user</h2>
				<br />
				{mostActive(props.users)}
				<br />
				<h4>To get you in the mood for some uncivilized discussion, here are some randomly picked comments across all blogs</h4>
				<br />
				<Table>
					<tbody>
						{/*Each randomComments render produces independent, (hopefully) different results*/}
						{randomComments(props.blogs)}
						{randomComments(props.blogs)}
						{randomComments(props.blogs)}
						{randomComments(props.blogs)}
						{randomComments(props.blogs)}
					</tbody>
				</Table>
			</div>
		</div>
	)
}


const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		users: state.users
	}
}

export default connect(mapStateToProps)(Home)