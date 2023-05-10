import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './PlusButton.style.js';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme';

function PlusButton({ buttonHandler }) {
  return (
    <TouchableOpacity style={styles.button} onPress={buttonHandler}>
      <MaterialIcons name="add" size={24} color={theme.white} />
    </TouchableOpacity>
  );
}

export default PlusButton;
