import { Text, View } from 'react-native';
import styles from './Login.style.js';
import { AuthButton } from '../components/Login';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import getEnv from '../env.js';
import { useSetRecoilState } from 'recoil';
import userInfo from '../recoil/userInfo';
import ModalState from '../recoil/modal.js';
import userPlayList from '../recoil/userPlayList.js';
import { alertProps, useServer, makeToast } from '../util';

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const server = useServer();
  const setUser = useSetRecoilState(userInfo);
  const setPlayList = useSetRecoilState(userPlayList);
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

      const {
        data: { data },
      } = await server.get(`/api/users/${userId}`);

      const { email, loginType } = data;

      return { Authorization, userId, email, loginType };
    } catch (e) {
      const { status, message } = e.response.data;
      const { userlogintype: loginType } = e.response.headers;

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
      makeToast(
        `로그인 중 오류가 발생했습니다.\nERROR: fail of get "PLAYLIST" `,
      );
      console.error(error);
    }
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
        makeToast(`로그인 중 오류가 발생했습니다.\nERROR: fail of get "CODE" `);
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
        makeToast(
          `로그인 중 오류가 발생했습니다.\nERROR: fail of get "ACCESS TOKEN" `,
        );
        console.error(e);
      }
    };

    // * 실제 코드 실행
    await getAuthCode();
    if (type !== 'GOOGLE') await getAccessToken();

    const { Authorization, userId, loginType, email } = await getUserInfo(
      type,
      resultOfAccessToken,
    );
    setUser({ userId, Authorization, loginType, email });

    const playList = await getPlayList(userId, Authorization);
    setPlayList(playList);
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
    </View>
  );
};

export default Login;
