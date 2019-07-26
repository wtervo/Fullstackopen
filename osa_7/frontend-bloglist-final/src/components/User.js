import React from "react"
import {Link} from "react-router-dom"
import {Button, Table} from "react-bootstrap"
import {connect} from "react-redux"

const User = (props) => {
	const user = props.user

	if (user === undefined) {
		return null
	}
	return (
		<div>
			<br />
			<h3>User ID: {user.id}</h3>
			<br />
			<p><b>Username: </b>{user.username}</p>
			<p><b>Name: </b>{user.name}</p>
			<br />
			<h4>Blogs added by this user:</h4>
			<Table striped>
				<thead style={{
					paddingTop: 10,
					paddingLeft: 2,
					border: "solid",
					borderWidth: 3,
					marginBottom: 5
				}}>
					<tr>
						<th>TITLE</th>
						<th>AUTHOR</th>
					</tr>
				</thead>
				<tbody>
					{user.blogs.map(blog => {
						return (
							<tr key={blog.id}>
								<td>
									<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
								</td>
								<td>{blog.author}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
			<br />
			<p>Total: {user.blogs.length} blogs</p>
			<br />
			<br />
			<Link to="/users"><Button>To Users</Button></Link>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => {
	const user = ownProps.user
	return {
		users: state.users,
		user
	}
}

export default connect(mapStateToProps)(User)