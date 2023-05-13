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

const Map = () => {
  const [hasPermission, setHasPermission] = useState(true);
  const [location, setLocation] = useState({
    latitude: 37.5662952,
    longitude: 126.9779451,
  });
  const setModal = useSetRecoilState(ModalState);

  useEffect(() => {
    getPermission();
    getLocation();
  }, []);

  const { BASE_URL } = getEnv();

  const getPermission = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    console.log(granted);

    if (!granted) {
      setHasPermission(false);

      const props = {
        isOpen: true,
        modalType: 'alert',
        props: {
          title: '위치 권한 오류',
          subTitle: `현재 사용자의 위치를 확인할 수 없습니다.\n위치 권한을 사용할 수 있도록 승인해주세요.`,
        },
      };

      setModal(props);
    }
  };

  const getLocation = async () => {
    const {
      coords: { latitude, longitude },
    } = await getCurrentPositionAsync({ accuracy: 5 });

    setLocation({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `${BASE_URL}/maps?searchType=코인노래&lng=${location.longitude}&lat=${location.latitude}`,
        }}
      />
      <MapButton handler={getLocation} />
    </View>
  );
};

export default Map;
