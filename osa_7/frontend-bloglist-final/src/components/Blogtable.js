import React from "react"
import {Table} from "react-bootstrap"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

const Blogtable = (props) => {
	return (
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
				{props.blogs.map(blog => {
					return (
						<tr key={blog.id}>
							<td>
								<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
							</td>
							<td>{blog.author}</td>
						</tr>
					)
				}
				)}
			</tbody>
		</Table>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}
}

export default connect(mapStateToProps)(Blogtable)