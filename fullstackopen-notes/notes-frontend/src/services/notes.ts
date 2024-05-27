import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const createNote = (noteObject: Note) =>
 axios.post(baseUrl, noteObject)


export const updateNote = (id: number, updatedNote: Note) =>
  axios.put(`${baseUrl}/${id}`, updatedNote)


