import Home from './screen/Home';
import { RecoilRoot } from 'recoil';
import { RootSiblingParent } from 'react-native-root-siblings';
import 'react-native-url-polyfill/auto';

export default function App() {
  return (
    <RootSiblingParent>
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    </RootSiblingParent>
  );
}
