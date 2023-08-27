import { TouchableOpacity } from 'react-native';
import styles from './ThreeDotButton.style.js';
import { Entypo } from '@expo/vector-icons';
import { theme } from '../../theme';

const ThreeDotButton = ({ buttonHandler }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={buttonHandler}>
      <Entypo name="dots-three-vertical" size={24} color={theme.white} />
    </TouchableOpacity>
  );
};

export default ThreeDotButton;
