import React, {useState} from "react"
import {Table, Button} from "react-bootstrap"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

const Blogtable = (props) => {

	const [titleFilter, setTitleFilter] = useState("")
	const [authorFilter, setAuthorFilter] = useState("")

	const blogFilter = () => {

		const resetHandler = () => {
			setTitleFilter("")
			setAuthorFilter("")
		}

		const titleFilterHandler = (event) => {
			event.preventDefault()
			setTitleFilter(event.target.value)
		}

		const authorFilterHandler = (event) => {
			event.preventDefault()
			setAuthorFilter(event.target.value)
		}

		return (
			//Would very much like to use Bootstrap here, but I cannot figure how to
			//access the event values in InputGroup...
			<div>
				<h4>Filter blogs by</h4>
				<form>
					<p><input name="title" onChange={titleFilterHandler} placeholder="Title" size="50"/></p>
					<p><input name="author" onChange={authorFilterHandler} placeholder="Author" size="50"/></p>
					<Button variant="primary" type="reset" onClick={resetHandler}>Reset</Button>
				</form>
			</div>
		)
	}

	const blogsToShow = (blogs) => {
		//The structure of this component is absolute shit, but I'm too tired to think of anything cleaner

		if (titleFilter === "" && authorFilter === "") {
			return (
				<tbody>
					{blogs.map(blog => {
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
			)
		}

		else {
			const titleFiltered = blogs.map(blog => {
				const titleLower = blog.title.toLowerCase()
				const titleSearch = titleLower.search(titleFilter.toLowerCase())
				if (titleSearch !== -1)
					return blog
			}).filter(blog => blog !== undefined)

			const authorFiltered = titleFiltered.map(blog => {
				const authorLower = blog.author.toLowerCase()
				const titleSearch = authorLower.search(authorFilter.toLowerCase())
				if (titleSearch !== -1)
					return blog
			}).filter(blog => blog !== undefined)

			return (
				<tbody>
					{authorFiltered.map(blog => {
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
			)
		}
	}

	return (
		<div>
			{blogFilter()}
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
				{blogsToShow(props.blogs)}
			</Table>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}
}

export default connect(mapStateToProps)(Blogtable)