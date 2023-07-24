import axios from 'axios'
export default axios.create({
  baseURL: 'http://54.80.111.38:8005',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    // Authorization: "Bearer "+ token,
  }
})
