import Home from './screen/Home';
import { RecoilRoot } from 'recoil';
import { RootSiblingParent } from 'react-native-root-siblings';
import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as Splash from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';

Splash.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
  };

  fetchFonts();

  useEffect(() => {
    if (isLoading) {
      setIsHideSplash(true);
      setTimeout(() => {
        Splash.hideAsync();
      }, 200);
    }
  }, [isLoading]);

  return (
    <RootSiblingParent>
      <RecoilRoot>
        <StatusBar style="auto" />
        {isHideSplash && <Home />}
      </RecoilRoot>
    </RootSiblingParent>
  );
}
