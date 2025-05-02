import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        "Content-Type": "application/json",
    },
    responseType: "json",
});


instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;