import axios from "axios";

const usersApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:1337/api"
})

export default usersApi;