import axios from 'axios';
const baseURL = `https://picsum.photos/`;

const api = axios.create({
  baseURL: baseURL,
})

export default api;