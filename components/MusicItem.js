import { Text, TouchableOpacity, View } from 'react-native';
import styles from './MusicItem.style';

const MusicItem = ({ item }) => {
  const { num, singer, title } = item;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.songInfo}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {singer}
        </Text>
      </View>
      <View style={styles.num}>
        <Text style={styles.numText}>{num}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MusicItem;
