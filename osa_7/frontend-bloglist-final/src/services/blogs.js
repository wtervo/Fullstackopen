import axios from "axios"
const baseUrl = "/api/blogs/"

let token = null

//This function is called on login so that the token is saved
const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const get = async blog => {
	const response = await axios.get(baseUrl + blog.id)
	return response.data
}

const getComments = async blog => {
	const response = await axios.get(baseUrl + blog.id + "/comments")
	return response.data
}

const create = async newObject => {
	const config = {
		headers: {Authorization: token}
	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = async updatedObject => {
	const response = await axios.put(baseUrl + updatedObject.id, updatedObject)
	return response.data
}

const remove = async (id) => {
	const config = {
		headers: {Authorization: token}
	}
	const response = await axios.delete(baseUrl + id, config)
	return response.data
}

export default {getAll, get, getComments, setToken, create, update, remove}