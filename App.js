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
import versionAlert from './util/versionAlert';

Splash.preventAutoHideAsync();

export default function App() {
  const availableVersion = '0.2';
  const [isHideSplash, setIsHideSplash] = useState(false);

  const fetchFonts = async () => {
    try {
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
      setIsHideSplash(true);
      setTimeout(() => {
        Splash.hideAsync();
      }, 200);
    } catch (error) {
      console.log(error);
    }
  };

  const getServerStatus = async () => {
    try {
      const {
        data: {
          data: { version: serverVersion },
        },
      } = await axios.get(`${process.env.EXPO_PUBLIC_BASE_URL}/version`);
      console.log('serverVersion:', serverVersion);

      if (serverVersion !== availableVersion) {
        versionAlert();
        return false;
      } else return true;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const isServerReady = await getServerStatus();
        if (isServerReady) await fetchFonts();
      } catch (error) {
        console.log(error);
      }
    };

    checkVersion();
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
