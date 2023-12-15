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

Splash.preventAutoHideAsync();

export default function App() {
  const appVersion = '0.2';
  const [isServerReady, setIsServerReady] = useState(true);
  const [isFontLoading, setIsFontLoading] = useState(false);
  const [isHideSplash, setIsHideSplash] = useState(false);
  const [isAllReady, setIsAllReady] = useState(false);

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
    console.log('폰트 로딩 완료');
  };

  useEffect(() => {
    const getServerStatus = async () => {
      try {
        const {
          data: { data },
        } = axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/`);
      } catch (err) {}
    };
  });

  useEffect(() => {
    fetchFonts();

    if (isFontLoading && isServerReady) {
      setIsHideSplash(true);
      setTimeout(() => {
        Splash.hideAsync();
      }, 200);
    }
  }, [isFontLoading]);

  return (
    <RootSiblingParent>
      <RecoilRoot>
        <StatusBar style="auto" />
        {isHideSplash && <Home />}
      </RecoilRoot>
    </RootSiblingParent>
  );
}
