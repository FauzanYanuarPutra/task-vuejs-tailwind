import axios from 'axios'
export default axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type'
    // Authorization: 'Bearer ' + token
  }
})
