import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState, useResetRecoilState } from 'recoil';
import userInfo from '../recoil/userInfo';
import { useNavigation } from '@react-navigation/native';
import makeToast from './makeToast';

const useServer = () => {
  const server = axios.create();
  const [{ Authorization, userId }, setUserInfo] = useRecoilState(userInfo);
  const resetUserInfo = useResetRecoilState(userInfo);
  const navigation = useNavigation();

  server.defaults.baseURL = BASE_URL;

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

      if (status === 500 || status === 501)
        makeToast('서버에서 오류가 발생했습니다.', true);

      if (status === 400 || status === 404)
        makeToast('클라이언트 요청에 오류가 발생했습니다.', true);

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
          makeToast('다시 로그인해주세요.', true);
        }
      }
      return Promise.reject(err);
    },
  );

  return server;
};

export default useServer;
