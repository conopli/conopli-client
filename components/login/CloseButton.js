import { TouchableOpacity } from 'react-native';
import styles from './CloseButton.style';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

const CloseButton = ({ handler }) => {
  return (
    <TouchableOpacity style={styles.mapButton} onPress={handler}>
      <MaterialIcons name="close" size={24} color={theme.lime} />
    </TouchableOpacity>
  );
};

export default CloseButton;
