import axios from 'axios'

export const WS_SERVER = 'ws://localhost:5000'
const SERVER = 'http://localhost:5000'

export const api = axios.create({
  baseURL: SERVER,
})
