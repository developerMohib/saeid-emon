import axios from 'axios';
// http://localhost:4000
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://saeid-emon.vercel.app',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default instance;
