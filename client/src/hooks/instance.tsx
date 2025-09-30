import axios from 'axios';
// http://localhost:4000
// https://saeid-emon.vercel.app
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default instance;
