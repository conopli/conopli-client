import React from 'react';
import { Text, View } from 'react-native';
import styles from './ListItem.style.js';

const ListItem = ({ item }) => {
  const { ranking, title, singer, num } = item;
  return (
    <View style={styles.container}>
      <View style={styles.leftbox}>
        <Text style={styles.rate}>{ranking}</Text>
      </View>
      <View style={styles.musicbox}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.singer} numberOfLines={1}>
          {singer}
        </Text>
      </View>
      <View style={styles.numbox}>
        <Text style={styles.number}>{num}</Text>
      </View>
    </View>
  );
};

export default ListItem;
