import axios from "axios"

export const apiPost = axios.create({
    baseURL: 'http://localhost:8000/api/1.0/posts',
    headers: { "Content-Type": "application/json", }
});

export const apiPostImg = axios.create({
    baseURL: 'http://localhost:8000/api/1.0/posts',
});

export const apiUser = axios.create({
    baseURL: 'http://localhost:8000/api/1.0/users',
    headers: { "Content-Type": "application/json", }
});

export const apiCollection = axios.create({
    baseURL: 'http://localhost:8000/api/1.0/collections',
    headers: { 
        "Content-Type": "application/json", 
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
});