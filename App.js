import Home from './screen/Home';
import { RecoilRoot } from 'recoil';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <RootSiblingParent>
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    </RootSiblingParent>
  );
}
