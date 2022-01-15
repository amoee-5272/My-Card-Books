import axios from 'axios'

const url = new URL("/", window.location.href);

// Create an http link:
/*const httpLink = new HttpLink({
  // uri: 'http://localhost:5000/graphql',
  uri: url.href,
});*/

//const API_ROOT = 'http://localhost:4000/'

const instance = axios.create({
  baseURL: url.href,
  withCredentials: true
})

export default instance
