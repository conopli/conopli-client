import axios from 'axios';
import getEnv from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState, useResetRecoilState } from 'recoil';
import userInfo from '../recoil/userInfo';
import { useNavigation } from '@react-navigation/native';

const useServer = () => {
  const server = axios.create();
  const [{ Authorization, userId }, setUserInfo] = useRecoilState(userInfo);
  const resetUserInfo = useResetRecoilState(userInfo);
  const navigation = useNavigation();

  server.defaults.baseURL = getEnv().BASE_URL;

  server.interceptors.request.use(
    async (config) => {
      config.headers.Authorization = Authorization;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  server.interceptors.response.use(
    (res) => res,
    async (err) => {
      console.log(err);
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

      if (status === 403 && message === 'EXPIRED ACCESS TOKEN') {
        const originReq = config;
        originReq.sent = true;

        try {
          const {
            data: { authorization: Authorization },
          } = await axios.get(
            `${getEnv.BASE_URL}/api/auth/reissue-token/${userId}`,
          );

          setUserInfo((prev) => ({ ...prev, Authorization }));

          originReq.headers.Authorization = Authorization;
          return axios(originReq);
        } catch (error) {
          console.log(err);
          await AsyncStorage.clear();
          resetUserInfo();
          resetPlayList();
          resetModal();
          navigation.navigate('Login');
          console.log('다시 로그인해주세요.');
        }
      }
      return Promise.reject(err);
    },
  );

  return server;
};

export default useServer;
