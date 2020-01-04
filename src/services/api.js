import axios from 'axios';

const api = axios.create({
    //baseURL:"http://192.168.1.2:3000/"
    baseURL: "https://us-central1-smart-air-5a097.cloudfunctions.net/SmartAir/"
});

export default api;