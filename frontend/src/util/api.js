import axios from "axios"

const { REACT_APP_SERVER_URL } = process.env;

export const apiPost = axios.create({
    baseURL: `${REACT_APP_SERVER_URL}/posts`,
    headers: { "Content-Type": "application/json", }
});

export const apiPostImg = axios.create({
    baseURL: `${REACT_APP_SERVER_URL}/posts`,
});

export const apiUser = axios.create({
    baseURL: `${REACT_APP_SERVER_URL}/users`,
    headers: { "Content-Type": "application/json", }
});

export const apiCollection = (token) => {
    return axios.create({
        baseURL: `${REACT_APP_SERVER_URL}/collections`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    })
};