import Home from './screen/Home';
import { RecoilRoot } from 'recoil';
import { RootSiblingParent } from 'react-native-root-siblings';
import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as Splash from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import axios from 'axios';
import { Alert, BackHandler, Linking } from 'react-native';

Splash.preventAutoHideAsync();

export default function App() {
  const appVersion = '0.2';
  const [isServerReady, setIsServerReady] = useState(false);
  const [isFontLoading, setIsFontLoading] = useState(false);
  const [isHideSplash, setIsHideSplash] = useState(false);

  const fetchFonts = async () => {
    await Font.loadAsync({
      Pretendard: require('./assets/fonts/PretendardJPVariable.ttf'),
      'Pretendard-100': require('./assets/fonts/PretendardJP-Thin.otf'),
      'Pretendard-200': require('./assets/fonts/PretendardJP-ExtraLight.otf'),
      'Pretendard-300': require('./assets/fonts/PretendardJP-Light.otf'),
      'Pretendard-400': require('./assets/fonts/PretendardJP-Regular.otf'),
      'Pretendard-500': require('./assets/fonts/PretendardJP-Medium.otf'),
      'Pretendard-600': require('./assets/fonts/PretendardJP-SemiBold.otf'),
      'Pretendard-700': require('./assets/fonts/PretendardJP-Bold.otf'),
      'Pretendard-800': require('./assets/fonts/PretendardJP-ExtraBold.otf'),
      'Pretendard-900': require('./assets/fonts/PretendardJP-Black.otf'),
    });
    setIsFontLoading(true);
  };

  const getServerStatus = async () => {
    // TODO : API 업데이트 이후 주소 및 데이터 다루는거 수정
    try {
      const {
        data: {
          data: { version: serverVersion },
        },
      } = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/`);
      setIsServerReady(serverVersion === appVersion);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isServerReady) {
      Alert.alert(
        '필수 업데이트 안내',
        `새로운 버전이 업데이트 되었습니다.\n확인을 누르시면 스토어로 이동합니다.\n(업데이트를 하지 않으면 앱을 이용할 수 없습니다.)`,
        [
          {
            text: '확인',
            onPress: () => {
              Linking.openURL('market://details?id=com.conopli');
              BackHandler.exitApp();
            },
          },
          {
            text: '취소',
            onPress: () => {
              BackHandler.exitApp();
            },
            style: 'cancle',
          },
        ],
      );
      return;
    }

    fetchFonts();

    if (isFontLoading) {
      setIsHideSplash(true);
      setTimeout(() => {
        Splash.hideAsync();
      }, 200);
    }
  }, []);

  return (
    <RootSiblingParent>
      <RecoilRoot>
        <StatusBar style="auto" />
        {isHideSplash && <Home />}
      </RecoilRoot>
    </RootSiblingParent>
  );
}
