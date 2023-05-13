import { TouchableOpacity } from 'react-native';
import styles from './MapButton.style';
import { mapIcon } from '../../assets/index.js';
import { WithLocalSvg } from 'react-native-svg';

const MapButton = ({ handler }) => {
  return (
    <TouchableOpacity style={styles.mapButton} onPress={handler}>
      <WithLocalSvg width={32} height={32} asset={mapIcon} />
    </TouchableOpacity>
  );
};

export default MapButton;
