import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)
export const create = (data) => axios.post(baseUrl, data).then(res => res.data)
export const update = data => axios.put(`${baseUrl}/${data.id}`, data).then(res => res.data)