import { Text, View, TouchableOpacity } from 'react-native';
import styles from './ModifyMusicItem.style';
import { MaterialIcons } from '@expo/vector-icons';

const ModifyMusicItem = ({ item, select, setSelect }) => {
  const { title, singer, userMusicId } = item;

  //! select 기능 구현 필요
  return (
    <TouchableOpacity style={[styles.container]}>
      <View style={styles.songInfo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{singer}</Text>
      </View>
      <View style={styles.icons}>
        <MaterialIcons name="edit" size={32} color="black" />
        <MaterialIcons name="drag-handle" size={32} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default ModifyMusicItem;
