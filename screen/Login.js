import { View } from 'react-native';
import styles from './Login.style.js';
import { AuthButton, CloseButton } from '../components/login';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import userInfo from '../recoil/userInfo';
import ModalState from '../recoil/modal.js';
import userPlayList from '../recoil/userPlayList.js';
import { alertProps, confirmProps, useServer, makeToast } from '../util';
import { WebView } from 'react-native-webview';
import { useState } from 'react';
import { CustomText } from '../components';
import Constants from 'expo-constants';

const INJECTED_JS = `window.ReactNativeWebView.postMessage('message from webView')`;

const Login = ({ navigation }) => {
  const server = useServer();
  const setUser = useSetRecoilState(userInfo);
  const setPlayList = useSetRecoilState(userPlayList);
  const setModal = useSetRecoilState(ModalState);
  const reset = useResetRecoilState(ModalState);
  const [loginInfo, setLoginInfo] = useState({ type: '', uri: '' });
  const [isLogin, setIsLogin] = useState(false);
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const kakaoId = process.env.EXPO_PUBLIC_KAKAO_ID;
  const naverId = process.env.EXPO_PUBLIC_NAVER_ID;
  const naverKey = process.env.EXPO_PUBLIC_NAVER_KEY;
  const googleId = process.env.EXPO_PUBLIC_GOOGLE_ID;
  const redirectUri = baseUrl + '/redirect';

  const getUserInfo = async (type, accessToken) => {
    try {
      const res = await server.post('/api/auth/login', {
        oauthAccessToken: accessToken,
        loginType: type,
      });

      const { authorization: Authorization, userid: userId } = res.headers;

      setUser({ Authorization });

      const {
        data: { data },
      } = await server.get(`/api/users/${userId}`, {
        headers: { Authorization },
      });

      const { email, loginType } = data;

      return { Authorization, userId, email, loginType };
    } catch (e) {
      const { code } = e.response.data;
      const { userlogintype: loginType } = e.response.headers;
      setIsLogin(false);

      const service =
        loginType === 'KAKAO'
          ? '카카오'
          : loginType === 'GOOGLE'
          ? '구글'
          : '네이버';

      if (code === 14003) {
        //! 기가입 회원 케이스 핸들링
        const loginFail = alertProps(
          '오류',
          `이미 가입한 이메일입니다.\n최초 가입한 소셜 서비스를 선택하세요.\n가입한 서비스 : ${service}`,
        );
        setModal(loginFail);
      } else if (code === 14007) {
        //! 비활성화 회원 케이스 핸들링
        const rejoinProps = confirmProps(
          '재가입',
          `이전에 ${service}로 가입했던 계정입니다.\n재가입 하시겠습니까?`,
          '예',
          () => {
            rejoin(accessToken, loginType);
            reset();
          },
        );
        setModal(rejoinProps);
      } else {
        console.error(e);
      }
    }
  };

  const getPlayList = async (userId, Authorization) => {
    try {
      const { data } = await server.get(`/api/user-music/playlist/${userId}`, {
        headers: { Authorization },
      });
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
        uri: `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoId}&redirect_uri=${redirectUri}&response_type=code`,
      });
    } else if (type === 'NAVER') {
      setLoginInfo({
        type: 'NAVER',
        uri: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverId}&redirect_uri=${redirectUri}`,
      });
    } else if (type === 'GOOGLE') {
      setLoginInfo({
        type: 'GOOGLE',
        uri: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email`,
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
    } else {
      //* 그 외의 경우 accessToken을 받기 위한 API 통신 진행
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      const code = params.get('code');

      //* url 부여
      let tokenUrl = '';
      if (type === 'KAKAO') {
        tokenUrl = `https://kauth.kakao.com/oauth/token?client_id=${kakaoId}&code=${code}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
      } else if (type === 'NAVER') {
        tokenUrl = `https://nid.naver.com/oauth2.0/token?client_id=${naverId}&code=${code}&redirect_uri=${redirectUri}&grant_type=authorization_code&state=9kgsGTfH4j7IyAkg&client_secret=${naverKey}`;
      }

      //* API 통신
      try {
        const {
          data: { access_token },
        } = await server.get(tokenUrl);

        accessToken = access_token;
      } catch (e) {
        console.error(e);
        setIsLogin(false);
      }
    }

    //* 발급받은 accessToken으로 서버에게 유저 정보 받아옴
    const userInfo = await getUserInfo(type, accessToken);

    //* userInfo를 올바르게 받아올 때만 이후 로직 실행
    if (typeof userInfo === 'object') {
      const { userId, loginType, Authorization, email } = userInfo;
      setUser((prev) => ({ ...prev, Authorization, loginType, email, userId }));

      //* 플레이리스트 서버에게 받아오고 적용
      const playList = await getPlayList(userId, Authorization);
      setPlayList(playList);

      //* 로그인 완료, 웹 뷰 닫고 스크린 이동 및 토스트 출력
      setIsLogin(false);
      navigation.navigate('Populer');
      makeToast('로그인이 완료되었습니다.');
    }
  };

  //* 재활성화
  const rejoin = async (accessToken, type) => {
    try {
      //재활성화 요청
      const rejoinRes = await server.patch('/api/users', {
        oauthAccessToken: accessToken,
        loginType: type,
      });

      const { authorization: Authorization } = rejoinRes.headers;
      const { userId, email, userStatus, loginType } = rejoinRes.data.data;

      //재활성화 완료된 경우 userInfo, playList 정보 세팅
      if (userStatus === 'VERIFIED') {
        setUser({ userId, Authorization, loginType, email });

        const playList = await getPlayList(userId, Authorization);
        setPlayList(playList);

        setIsLogin(false);
        navigation.navigate('Populer');
        makeToast('재가입 및 로그인이 완료되었습니다.');
      } else {
        makeToast('재가입에 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (e) {
      makeToast('재가입에 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <CustomText fontWeight={700} style={styles.loginText}>
        해당 기능은 로그인 후 이용 가능합니다.
      </CustomText>
      <View style={styles.buttonBox}>
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
        <>
          <WebView
            containerStyle={styles.webView}
            source={{ uri: loginInfo.uri }}
            userAgent={
              Constants.platform === 'ios'
                ? `mozilla/5.0 (iphone; CPU IPhone OS ${Constants.systemVersion} like Mac OS X) applewebkit/605.1.15 (khtml, like gecko) version/15.0 mobile/15e148 safari/604.1`
                : `Mozilla/5.0 (Linux; Android ${Constants.systemVersion}; ${Constants.deviceName}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36`
            }
            injectedJavaScript={INJECTED_JS}
            onMessage={(e) => {
              const { url } = e.nativeEvent;
              if (url.startsWith(redirectUri)) {
                getToken(url);
              }
            }}
          />
          <CloseButton
            handler={() => {
              setIsLogin(false);
            }}
          />
        </>
      )}
    </View>
  );
};

export default Login;
