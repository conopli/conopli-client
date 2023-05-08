import axios from 'axios';
import getEnv from '../env';

const server = axios.create();

server.defaults.baseURL = getEnv().BASE_URL;

// server.interceptors.request.use()

export default server;
