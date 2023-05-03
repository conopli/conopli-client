import { Text, TouchableOpacity, View } from 'react-native';
import styles from './MapButton.style';
import { mapIcon } from '../../assets/index.js';
import { WithLocalSvg } from 'react-native-svg';

const MapButton = ({ handler }) => {
  //TODO::
  //handler에 위치 권한 동의 로직 받아와서 새로운 요청 보내도록
  return (
    <TouchableOpacity style={styles.mapButton} onPerss={handler}>
      <WithLocalSvg width={32} height={32} asset={mapIcon} />
    </TouchableOpacity>
  );
};

export default MapButton;
