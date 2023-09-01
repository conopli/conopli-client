import axios from 'axios';
import { BASE_URL } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState, useResetRecoilState } from 'recoil';
import userInfo from '../recoil/userInfo';
import { useNavigation } from '@react-navigation/native';
import makeToast from './makeToast';
import errorCodes from './error';

const useServer = () => {
  const server = axios.create();
  const [{ Authorization, userId }, setUserInfo] = useRecoilState(userInfo);
  const resetUserInfo = useResetRecoilState(userInfo);
  const navigation = useNavigation();

  server.defaults.baseURL = BASE_URL;

  server.interceptors.request.use(
    async (config) => {
      if (Authorization !== '') config.headers.Authorization = Authorization;
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
          data: { status, message, code },
        },
      } = err;

      if (config.sent) return Promise.reject(error);

      //* API에서 정해준 에러코드 배열
      const errorCodesArr = Object.keys(errorCodes);

      //* 예외로 둘 에러코드 배열 (이미 다른 곳에서 핸들링을 하고있음)
      const xcptCodesArr = [14003, 14007, 14013];

      if (code === 14013) {
        const originReq = config;
        originReq.sent = true;

        try {
          const {
            data: { authorization: Authorization },
          } = await axios.get(`${BASE_URL}/api/auth/reissue-token/${userId}`);

          setUserInfo((prev) => ({ ...prev, Authorization }));

          originReq.headers.Authorization = Authorization;
          return axios(originReq);
        } catch (error) {
          await AsyncStorage.clear();
          resetUserInfo();
          resetPlayList();
          resetModal();
          navigation.navigate('Login');
          makeToast('다시 로그인해주세요.', true);
        }
      } else if (
        errorCodesArr.includes(code.toString()) &&
        !xcptCodesArr.includes(code)
      ) {
        //* 에러 코드에 포함이 되어 있으면서 예외 코드가 아닌 케이스
        makeToast(
          `서버 와의 연결 중 에러가 발생했습니다.\nERROR: ${errorCodes[code]}`,
          true,
        );
      } else if (!xcptCodesArr.includes(code)) {
        //* 기타 예상하지 못한 에러 발생 시
        makeToast(
          `알 수 없는 오류가 발생했습니다.\nERROR: ${status} ${message}`,
          true,
        );
      }

      return Promise.reject(err);
    },
  );

  return server;
};

export default useServer;
