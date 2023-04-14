import { Text, View, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import styles from './SmallButton.style';
import { useState } from 'react';

const SmallButton = ({ text }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsClicked((prev) => !prev)}
      style={isClicked ? styles.lime : styles.lightGray}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SmallButton;
