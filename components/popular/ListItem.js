import React from 'react';
import { Text, View } from 'react-native';
import { theme } from '../../theme';
import styles from './ListItem.style.js';

function ListItem({ rate, title, singer, number }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftbox}>
        <Text style={styles.rate}>{rate}</Text>
        <View style={styles.musicbox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.singer}>{singer}</Text>
        </View>
      </View>
      <Text style={styles.number}>{number}</Text>
    </View>
  );
}

export default ListItem;
