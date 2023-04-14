import { Text, View, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import styles from './SmallButton.style';
import { useState } from 'react';

//TODO: 실제로 사용할 때는 인기차트 세 개의 버튼 중 하나만 클릭되어야 하므로 로직 변경 필요
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
