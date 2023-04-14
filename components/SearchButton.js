import { Text, TouchableOpacity } from 'react-native';
import styles from './SearchButton.style';
import { useState } from 'react';

const SearchButton = () => {
  const [isClicked, setIstClicked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIstClicked((prev) => !prev)}
      style={styles.button}
    >
      <Text style={styles.text}>{isClicked ? '가수' : '제목'}</Text>
    </TouchableOpacity>
  );
};

export default SearchButton;
