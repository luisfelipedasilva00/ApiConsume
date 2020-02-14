import axios from 'axios';

// to run api mock: json-server server.json

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
