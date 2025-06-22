import axios from 'axios';
console.log("BASE URL:", process.env.REACT_APP_API_BASE_URL)
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // change to your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
