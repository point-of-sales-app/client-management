import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
    timeout: 30000,
    baseURL: 'https://pos-server.rezapramudhika.com',
    headers: { token }
})

export default instance;
