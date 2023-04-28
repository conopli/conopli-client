import { Text, TouchableOpacity, View } from 'react-native';
import styles from './MusicItem.style';

const MusicItem = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.songInfo}>
        <Text style={styles.title}>title</Text>
        <Text style={styles.artist}>artist</Text>
      </View>
      <View style={styles.num}>
        <Text style={styles.numText}>00000</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MusicItem;
