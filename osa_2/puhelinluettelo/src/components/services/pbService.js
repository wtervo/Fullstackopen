import axios from 'axios'

const baseUrl = "http://localhost:3001/persons/"

const getAll = (extention) => {
    const request = axios.get(baseUrl + extention)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const replace = newObject => {
    const request = axios.put(baseUrl + newObject.id, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(baseUrl + id)
    return request.then(response => response.data)
}

export default {getAll, create, replace, remove}