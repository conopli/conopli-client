import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './Map.style';
import MapButton from '../components/Map/MapButton';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import getEnv from '../env';
import { useSetRecoilState } from 'recoil';
import ModalState from '../recoil/modal';
import { alertProps } from '../util';

const Map = () => {
  const [hasPermission, setHasPermission] = useState(true);
  const [location, setLocation] = useState({
    latitude: 37.5662952,
    longitude: 126.9779451,
  });
  const setModal = useSetRecoilState(ModalState);

  const permissionAlert = alertProps(
    '위치 권한 오류',
    `현재 사용자의 위치를 확인할 수 없습니다.\n위치 권한을 사용할 수 있도록 승인해주세요.`,
  );

  useEffect(() => {
    getLocation();
  }, []);

  const { BASE_URL } = getEnv();

  const mapUri = `${BASE_URL}/maps?searchType=코인노래&lng=${location.longitude}&lat=${location.latitude}`;

  const getLocation = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    console.log(granted);

    if (!granted) {
      setHasPermission(false);

      setModal(permissionAlert);
    }

    const {
      coords: { latitude, longitude },
    } = await getCurrentPositionAsync({ accuracy: 5 });

    setLocation({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: mapUri,
        }}
        userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
      />
      <MapButton handler={getLocation} />
    </View>
  );
};

export default Map;
