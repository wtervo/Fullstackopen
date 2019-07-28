import axios from "axios"
const baseUrl = "/api/users/"


const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const get = user => {
	const response = axios.get(baseUrl + user.id)
	return response.data
}

const create = async newObject => {
	const response = await axios.post(baseUrl, newObject)
	return response.data
}

const update = async updatedObject => {
	const response = await axios.put(baseUrl + updatedObject.id, updatedObject)
	return response.data
}


export default {getAll, get, create, update}