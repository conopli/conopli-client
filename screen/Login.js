import React from 'react';
import { Text, View } from 'react-native';
import styles from './Login.style.js';
import { AuthButton } from '../components/Login';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getEnv from '../env.js';
import server from '../util/axios';
import { useSetRecoilState, useRecoilState } from 'recoil';
import userInfo from '../recoil/userInfo';
import ModalState from '../recoil/modal.js';

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const setUser = useSetRecoilState(userInfo);
  const setModal = useSetRecoilState(ModalState);

  const expoAuthUri = AuthSession.makeRedirectUri({
    path: 'redirect',
    useProxy: true,
  });

  const { KAKAO_ID, NAVER_ID, NAVER_KEY, GOOGLE_ID } = getEnv();

  const getUserInfo = async (type, accessToken) => {
    try {
      const res = await server.post('/api/auth/login', {
        oauthAccessToken: accessToken,
        loginType: type,
      });

      const { authorization: Authorization, userid: userId } = res.headers;

      return { Authorization, userId };
    } catch (e) {
      const { status, message } = e.response.data;
      if (status === 400 && message === 'Already Exist User Email') {
        setModal({
          isOpen: true,
          modalType: 'alert',
          props: {
            title: '오류',
            subTitle: `이미 가입한 이메일입니다.\n최초 가입한 소셜 서비스를 선택하세요.`,
          },
        });
      }
    }
  };

  const setUserInfo = async (Authorization, userId) => {
    setUser({ userId, Authorization });
    navigation.navigate('Populer');
  };

  // * 기존 asyncStorage 방식
  // const setUserInfo = async (accessToken, userId) => {
  //   try {
  //     await AsyncStorage.setItem('Authorization', accessToken);
  //     await AsyncStorage.setItem('userId', userId);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const loginHandler = async (type) => {
    let codeUrl = '';
    let tokenUrl = '';
    let resultOfCode = '';
    let resultOfAccessToken = '';

    const getAuthCode = async () => {
      // * 코드 발급을 위한 url 지정
      if (type === 'KAKAO') {
        codeUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${expoAuthUri}&response_type=code`;
      } else if (type === 'NAVER') {
        codeUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_ID}&redirect_uri=${expoAuthUri}`;
      } else if (type === 'GOOGLE') {
        codeUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${expoAuthUri}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email`;
      }

      // * 코드 발급
      try {
        const getCode = await AuthSession.startAsync({ authUrl: codeUrl });

        if (getCode.type === 'success') {
          if (type === 'GOOGLE') {
            const {
              params: { access_token },
            } = getCode;

            resultOfAccessToken = access_token;
          }

          const {
            params: { code },
          } = getCode;

          resultOfCode = code;
        }
      } catch (e) {
        console.error(e);
      }
    };

    const getAccessToken = async () => {
      // * 토큰 발급을 위한 url 지정
      if (type === 'KAKAO') {
        tokenUrl = `https://kauth.kakao.com/oauth/token?client_id=${KAKAO_ID}&code=${resultOfCode}&redirect_uri=${expoAuthUri}&grant_type=authorization_code`;
      } else if (type === 'NAVER') {
        tokenUrl = `https://nid.naver.com/oauth2.0/token?client_id=${NAVER_ID}&code=${resultOfCode}&redirect_uri=${expoAuthUri}&grant_type=authorization_code&state=9kgsGTfH4j7IyAkg&client_secret=${NAVER_KEY}`;
      }

      // * 토큰 발급
      try {
        const {
          data: { access_token },
        } = await server.get(tokenUrl);
        console.log('access_token', access_token);
        resultOfAccessToken = access_token;
      } catch (e) {
        console.error(e);
      }
    };

    // * 실제 코드 실행
    await getAuthCode();
    if (type !== 'GOOGLE') await getAccessToken();
    const { Authorization, userId } = await getUserInfo(
      type,
      resultOfAccessToken,
    );

    await setUserInfo(Authorization, userId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.login_text}>
        해당 기능은 로그인 후 이용 가능합니다.
      </Text>
      <View style={styles.button_box}>
        <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
          <AuthButton
            type="kakao"
            buttonHandler={() => {
              loginHandler('KAKAO');
            }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
          <AuthButton
            type="google"
            buttonHandler={() => {
              loginHandler('GOOGLE');
            }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
          <AuthButton
            type="naver"
            buttonHandler={() => {
              loginHandler('NAVER');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
