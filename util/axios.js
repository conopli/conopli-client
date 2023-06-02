import axios from 'axios';
import getEnv from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO : 차후에 커스텀훅화 하고 다른 스크린이나 api 연결 모두 변경 필요
// ex. const useServer = () => {return server}

const server = axios.create();

// 디바이스에 저장 된 토큰을 가져오는 함수
// (현재는 일반 함수라 Hook을 사용할 수 없기 때문에 AsyncStorage에서 직접 가져옴)
// TODO: 커스텀 훅으로 변경 후 전역 상태에서 가져오므로 삭제 예정
const getToken = async () => {
  const userInfo = await AsyncStorage.getItem('current_user');
  const { Authorization } = JSON.parse(userInfo);
  return Authorization;
};

server.defaults.baseURL = getEnv().BASE_URL;

server.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

server.interceptors.response.use(
  (res) => res,
  async (err) => {
    const {
      config,
      response: {
        data: { status, message },
      },
    } = err;

    if (config.sent) return Promise.reject(error);

    // TODO : console.log => toast message로 모두 대체
    if (status === 500) console.log('500 server err');

    if (status === 404) console.log('404 err');

    // TODO : 커스텀 훅으로 변경 후 토큰 재발급을 위한 response interceptor로 변경
    // if (status === 403 && message === 'EXPIRED ACCESS TOKEN') {
    //   const originReq = config;
    //   originReq.sent = true;
    // }
    return Promise.reject(err);
  },
);

export default server;
