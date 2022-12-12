import axios from "axios"

export const apiPost = axios.create({
    baseURL: 'http://localhost:8000/api/1.0/posts',
    headers: { "Content-Type": "application/json", }
});

export const apiUser = axios.create({
    baseURL: 'http://localhost:8000/api/1.0/users',
    headers: { "Content-Type": "application/json", }
});