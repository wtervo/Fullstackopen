import React from "react"
import {Table} from "react-bootstrap"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

//This component has the table of users and also some statistics involving users
const Users = (props) => {
	const totalUsers= props.users.length
	const activeUsers = props.users.filter(user => user.blogs.length !== 0)
	const commentedBlogs = props.blogs.filter(blog => blog.comments.length !== 0)
	const totalComments = commentedBlogs.map(blog => blog.comments.length).reduce((a, b) => a + b, 0) //.reduce sums up all the comments

	return (
		<div>
			<br />
			{/*User is considered active if they have submitted at least one blog*/}
			<p class="text-center"><big>Currently {totalUsers} registered users, of which {activeUsers.length} are active ({(100 * parseInt(activeUsers.length) /  parseInt(totalUsers)).toFixed(2)}%).</big></p>
			<p class="text-center"><big>Our users have submitted a total of {totalComments} (anonymous) comments across {commentedBlogs.length} blogs!</big></p>
			<br />
			<h2>List of registered users</h2>
			<br/>
			<h4><b>Click a username to view more details</b></h4>
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
						<th>USERNAME</th>
						<th>BLOGS ADDED</th>
						<th>% OF ALL BLOGS</th>
					</tr>
				</thead>
				<tbody>
					{props.users.map(user => {
						return(
							<tr key={user.id}>
								<td>
									<Link to={`/users/${user.id}`}>{user.username}</Link>
								</td>
								<td>{user.blogs.length}</td>
								<td>{(100 * user.blogs.length / props.blogs.length).toFixed(2)}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		users: state.users,
	}
}

export default connect(mapStateToProps)(Users)