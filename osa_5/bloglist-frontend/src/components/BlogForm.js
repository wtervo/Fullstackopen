import React from "react"

const BlogForm = ({
  addBlog,
  newBlog,
  newAuthor,
  newUrl,
  newLikes,
  handleBlogChange,
  handleAuthorChange,
  handleUrlChange,
  handleLikesChange
  }) => (
    <>
    <h2>Add a new blog</h2>
    <form onSubmit={addBlog}>
    	<p>Title: <input
    		value={newBlog}
    		onChange={handleBlogChange}
    	/></p>
    	<p>Author: <input
    		value={newAuthor}
    		onChange={handleAuthorChange}
    	/></p>
    	<p>URL: <input 
    		value={newUrl}
    		onChange={handleUrlChange}
    	/></p>
    	<p>Likes: <input
    		value={newLikes}
    		onChange={handleLikesChange}
    	/></p>
    	<button type="submit">Save</button>
    </form> 
    </>
)

export default BlogForm