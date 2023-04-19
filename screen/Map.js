import { Text, View, Platform } from 'react-native';
import { theme } from '../theme';
import { WebView } from 'react-native-webview';

const Map = () => {
  return (
    <WebView
      source={{ uri: 'https://map.kakao.com/?urlX=523954.0&urlY=1084098.0' }}
    />
  );
};

export default Map;
