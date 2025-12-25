import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = axios.create({
  baseURL : BACKEND_URL,
})

//user
export const fetchUserSignUp = async(data) => await API.post('/api/auth/user/register', data) 
export const fetchUserLogin = async(data) => await API.post('/api/auth/user/login', data)

