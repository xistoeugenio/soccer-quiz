import axios from "axios"

const onlineApi = "https://soccer-api-ezu3.onrender.com/api"
const localApi = "http://localhost:8800/api"

export const makeRequest = axios.create({
    baseURL: onlineApi,
    withCredentials: true
})