import { Text, View, TouchableOpacity } from 'react-native';
import { playlistColor } from '../../theme';
import styles from './PlaylistItem.style';

const PlaylistItem = ({ navigation, item }) => {
  const { color, emoji, title } = item;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: playlistColor[color] }]}
      onPress={() => {
        navigation.push('Detail');
      }}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{emoji}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistItem;
