import { Text, View, TouchableOpacity } from 'react-native';
import { playlistColor } from '../../theme';
import styles from './PlaylistItem.style';

const PlaylistItem = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: playlistColor[1] }]}
      onPress={() => {
        navigation.push('Detail');
      }}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>✨</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>퇴사 말릴때</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistItem;
