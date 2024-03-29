import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './Map.style';
import { MapButton, Toggle } from '../components/map';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import { useEffect, useState } from 'react';
import { makeToast } from '../util';
import Constants from 'expo-constants';

const Map = () => {
  const [hasPermission, setHasPermission] = useState(true);
  const [location, setLocation] = useState({
    latitude: 37.5662952,
    longitude: 126.9779451,
  });
  const [toggle, setToggle] = useState('코인노래방');
  const [mapUriKey, setMapUriKey] = useState('코인노래');
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  const mapUri = `${baseUrl}/maps?searchType=${mapUriKey}&lng=${location.longitude}&lat=${location.latitude}`;

  useEffect(() => {
    getLocation();
    if (!hasPermission)
      makeToast(
        '현재 사용자의 위치를 확인할 수 없습니다.\n위치 권한을 사용할 수 있도록 승인해주세요.',
        true,
        4000,
      );
  }, [hasPermission]);

  const getLocation = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (!granted) {
      setHasPermission(false);
    }

    const {
      coords: { latitude, longitude },
    } = await getCurrentPositionAsync({ accuracy: 5 });

    setLocation({ latitude, longitude });
  };

  const toggleList = {
    left: {
      name: '코인노래방',
      active: toggle === '코인노래방',
      handler: () => toggleHandler('코인노래방'),
    },
    right: {
      name: '전체 노래방',
      active: toggle === '전체 노래방',
      handler: () => toggleHandler('전체 노래방'),
    },
  };

  const toggleHandler = (name) => {
    setToggle(name);
  };

  useEffect(() => {
    if (toggle === '코인노래방') {
      setMapUriKey('코인노래');
    } else {
      setMapUriKey('노래연습장');
    }
  }, [toggle]);

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: mapUri,
        }}
        userAgent={
          Constants.platform === 'ios'
            ? `mozilla/5.0 (iphone; CPU IPhone OS ${Constants.systemVersion} like Mac OS X) applewebkit/605.1.15 (khtml, like gecko) version/15.0 mobile/15e148 safari/604.1`
            : `Mozilla/5.0 (Linux; Android ${Constants.systemVersion}; ${Constants.deviceName}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36`
        }
      />
      <Toggle toggleList={toggleList} />
      <MapButton handler={getLocation} />
    </View>
  );
};

export default Map;
