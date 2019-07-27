import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {Table} from "react-bootstrap"

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
		const topUser = sortedUsers[0]

		if (topUser === undefined) {
			return null
		}
		return (
			<p><big><u><Link to={`/users/${topUser.id}`}>{topUser.username}</Link></u> with {topUser.blogs.length} added blogs!</big></p>
		)
	}

	const randomComments = (blogs) => {
		const blogsWithComments = blogs.filter(blog => blog.comments.length !== 0)
		const randomNumMax1 = blogsWithComments.length
		const chosenBlog = Math.floor(Math.random() * randomNumMax1)
		if (blogsWithComments[chosenBlog] === undefined) {
			return null
		}
		const randomNumMax2 = blogsWithComments[chosenBlog].comments.length
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