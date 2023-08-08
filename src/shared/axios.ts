import axios from 'axios';

export const baseHttp = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: false,
})

export const withAuthHttp = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        common: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
        }
    }
})

