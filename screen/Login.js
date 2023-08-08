import { Text, View } from 'react-native';
import styles from './Login.style.js';
import { AuthButton } from '../components/Login';
import {
  KAKAO_ID,
  NAVER_ID,
  NAVER_KEY,
  GOOGLE_ID,
  BASE_URL,
} from 'react-native-dotenv';
import { useSetRecoilState } from 'recoil';
import userInfo from '../recoil/userInfo';
import ModalState from '../recoil/modal.js';
import userPlayList from '../recoil/userPlayList.js';
import { alertProps, confirmProps, useServer, makeToast } from '../util';
import { WebView } from 'react-native-webview';
import { useState } from 'react';

const INJECTED_JS = `window.ReactNativeWebView.postMessage('message from webView')`;

const Login = ({ navigation }) => {
  const server = useServer();
  const setUser = useSetRecoilState(userInfo);
  const setPlayList = useSetRecoilState(userPlayList);
  const setModal = useSetRecoilState(ModalState);
  const [loginInfo, setLoginInfo] = useState({ type: '', uri: '' });
  const [isLogin, setIsLogin] = useState(false);

  // TODO : 차후 리디렉션 주소 변경 요망 = BASE_URL + 'redirect';
  const redirectUri = 'https://auth.expo.io/@ninefloor/conopli';

  const getUserInfo = async (type, accessToken) => {
    try {
      const res = await server.post('/api/auth/login', {
        oauthAccessToken: accessToken,
        loginType: type,
      });

      const { authorization: Authorization, userid: userId } = res.headers;

      const {
        data: { data },
      } = await server.get(`/api/users/${userId}`);

      const { email, loginType } = data;

      return { Authorization, userId, email, loginType };
    } catch (e) {
      const { status, message } = e.response.data;
      const { userlogintype: loginType } = e.response.headers;
      setIsLogin(false);

      if (status === 400 && message === 'Already Exist User Email') {
        const service =
          loginType === 'KAKAO'
            ? '카카오'
            : loginType === 'GOOGLE'
            ? '구글'
            : '네이버';

        const loginFail = alertProps(
          '오류',
          `이미 가입한 이메일입니다.\n최초 가입한 소셜 서비스를 선택하세요.\n가입한 서비스 : ${service}`,
        );
        setModal(loginFail);
      } else if (status === 403 && loginType) {
        const rejoin = confirmProps(
          '재가입',
          '재가입 하시겠습니까?',
          '예',
          () => {
            //TODO:: 재가입 로직
            console.log('재가입 할 거임!');
          },
        );
        setModal(rejoin);
      } else {
        makeToast(
          `로그인 중 오류가 발생했습니다.\nERROR: fail of get "USER INFO" `,
        );
        console.error(e);
      }
    }
  };

  const getPlayList = async (userId) => {
    try {
      const { data } = await server.get(`/api/user-music/playlist/${userId}`);
      return data.data;
    } catch (error) {
      setIsLogin(false);
      makeToast(
        `로그인 중 오류가 발생했습니다.\nERROR: fail of get "PLAYLIST" `,
      );
      console.error(error);
    }
  };

  const loginHandler = (type) => {
    // * 코드 발급을 위한 url 지정
    if (type === 'KAKAO') {
      setLoginInfo({
        type: 'KAKAO',
        uri: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${redirectUri}&response_type=code`,
      });
    } else if (type === 'NAVER') {
      setLoginInfo({
        type: 'NAVER',
        uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_ID}&redirect_uri=${redirectUri}`,
      });
    } else if (type === 'GOOGLE') {
      setLoginInfo({
        type: 'GOOGLE',
        uri: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email`,
      });
    }
    // * 웹 뷰 오픈
    setIsLogin(true);
  };

  // * 웹 뷰 이벤트 감지 시 동작하는 코드 (로그인 과정)
  const getToken = async (url) => {
    const { type } = loginInfo;
    let accessToken = '';

    if (type === 'GOOGLE') {
      //* 구글의 경우 바로 accessToken을 받아옴
      const startIndex = url.indexOf('#access_token') + 14;
      const endIndex = url.indexOf('&', startIndex);
      accessToken = url.substring(startIndex, endIndex);
      console.log('accessToken,', accessToken);
    } else {
      //* 그 외의 경우 accessToken을 받기 위한 API 통신 진행
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      const code = params.get('code');
      console.log('code,', code);

      //* url 부여
      let tokenUrl = '';
      if (type === 'KAKAO') {
        tokenUrl = `https://kauth.kakao.com/oauth/token?client_id=${KAKAO_ID}&code=${code}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
      } else if (type === 'NAVER') {
        tokenUrl = `https://nid.naver.com/oauth2.0/token?client_id=${NAVER_ID}&code=${code}&redirect_uri=${redirectUri}&grant_type=authorization_code&state=9kgsGTfH4j7IyAkg&client_secret=${NAVER_KEY}`;
      }

      //* API 통신
      try {
        const {
          data: { access_token },
        } = await server.get(tokenUrl);

        accessToken = access_token;
        console.log(accessToken);
      } catch (e) {
        makeToast(
          `로그인 중 오류가 발생했습니다.\nERROR: fail of get "ACCESS TOKEN" `,
        );
        console.error(e);
        setIsLogin(false);
      }
    }

    //* 발급받은 accessToken으로 서버에게 유저 정보 받아오고 적용
    const { Authorization, userId, loginType, email } = await getUserInfo(
      type,
      accessToken,
    );
    setUser({ userId, Authorization, loginType, email });

    //* 플레이리스트 서버에게 받아오고 적용
    const playList = await getPlayList(userId, Authorization);
    setPlayList(playList);

    //* 로그인 완료, 웹 뷰 닫고 스크린 이동 및 토스트 출력
    setIsLogin(false);
    navigation.navigate('Populer');
    makeToast('로그인이 완료되었습니다.');
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
      {isLogin && (
        <WebView
          containerStyle={styles.webView}
          source={{ uri: loginInfo.uri }}
          userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
          injectedJavaScript={INJECTED_JS}
          onMessage={(e) => {
            const { url } = e.nativeEvent;
            console.log('url,', url);
            if (url.startsWith(redirectUri)) {
              getToken(url);
            }
          }}
        />
      )}
    </View>
  );
};

export default Login;
