import { TouchableOpacity } from 'react-native';
import styles from './MapButton.style';
import MapIcon from '../../assets/mapIcon.svg';

const MapButton = ({ handler }) => {
  return (
    <TouchableOpacity style={styles.mapButton} onPress={handler}>
      <MapIcon width={32} height={32} />
    </TouchableOpacity>
  );
};

export default MapButton;
