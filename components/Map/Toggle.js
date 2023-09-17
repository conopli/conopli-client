import { TouchableOpacity, View } from 'react-native';
import styles from './Toggle.style';
import CustomText from '../CustomText';

const Toggle = ({ value, toggleList }) => {
  //toggleList : left, right - {name, active(bool), handler}
  const { left, right } = toggleList;
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[styles.toggle, left.active && styles.active]}
        onPress={left.handler}
      >
        <CustomText fontWeight={700} style={styles.text}>
          {left.name}
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggle, right.active && styles.active]}
        onPress={right.handler}
      >
        <CustomText fontWeight={700} style={styles.text}>
          {right.name}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default Toggle;
