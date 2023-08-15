import Home from './screen/Home';
import { RecoilRoot } from 'recoil';
import { RootSiblingParent } from 'react-native-root-siblings';
import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <RootSiblingParent>
      <RecoilRoot>
        <StatusBar style="auto" />
        <Home />
      </RecoilRoot>
    </RootSiblingParent>
  );
}
