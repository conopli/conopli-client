import { Text, View, TouchableOpacity } from 'react-native';
import styles from './SmallButton.style';

const SmallButton = ({ text, isClicked, setIsClicked }) => {
  return (
    <TouchableOpacity
      onPress={setIsClicked}
      style={isClicked ? styles.lime : styles.lightGray}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SmallButton;
