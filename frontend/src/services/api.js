import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,    // <–– allow Sanctum cookies if you use them
  headers: { 'Content-Type': 'application/json' },
});
