import { Text, View, TouchableOpacity } from 'react-native';
import styles from './ModifyMusicItem.style';
import { MaterialIcons } from '@expo/vector-icons';

const ModifyMusicItem = () => {
  const select = false;
  return (
    <TouchableOpacity style={[styles.container, select && styles.select]}>
      <View style={styles.songInfo}>
        <Text style={styles.title}>title</Text>
        <Text style={styles.artist}>artist</Text>
      </View>
      <View style={styles.icons}>
        <MaterialIcons name="edit" size={32} color="black" />
        <MaterialIcons name="drag-handle" size={32} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default ModifyMusicItem;
