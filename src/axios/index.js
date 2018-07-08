import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
    timeout: 30000,
    baseURL: 'http://localhost:3001',
    headers: { token }
    // baseURL: 'http://35.197.143.2/'
    // baseURL: 'http://192.168.1.130:3000' 
})

export default instance;
