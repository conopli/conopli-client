import { Text, TouchableOpacity } from 'react-native';
import styles from './SearchButton.style';
import { useState } from 'react';

const SearchButton = ({ buttonHandler }) => {
  const [isClicked, setIstClicked] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setIstClicked((prev) => !prev);
        buttonHandler(isClicked ? '가수' : '제목');
      }}
      style={styles.button}
    >
      <Text style={styles.text}>{isClicked ? '가수' : '제목'}</Text>
    </TouchableOpacity>
  );
};

export default SearchButton;
