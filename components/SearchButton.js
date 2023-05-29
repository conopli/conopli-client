import { Text, TouchableOpacity } from 'react-native';
import styles from './SearchButton.style';
import { useState } from 'react';

const SearchButton = ({ isClicked, setIsClicked }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setIsClicked((prev) => !prev);
      }}
      style={styles.button}
    >
      <Text style={styles.text}>{isClicked ? '가수' : '제목'}</Text>
    </TouchableOpacity>
  );
};

export default SearchButton;
