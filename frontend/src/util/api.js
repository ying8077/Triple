import axios from "axios"

export const apiPost = axios.create({
    baseURL: 'http://localhost:8000/api/1.0/posts',
    headers: { "Content-Type": "application/json", }
});