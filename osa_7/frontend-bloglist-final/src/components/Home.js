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
			<p><big><Link to={`/users/${topUser.id}`}>{topUser.username}</Link> with {topUser.blogs.length} added blogs!</big></p>
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
				{mostActive(props.users)}
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