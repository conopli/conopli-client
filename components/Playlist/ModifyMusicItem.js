import { Text, View, TouchableOpacity } from 'react-native';
import styles from './ModifyMusicItem.style';
import { MaterialIcons } from '@expo/vector-icons';

const ModifyMusicItem = ({ item, select, setSelect }) => {
  const { title, singer, userMusicId } = item;

  const selectHandler = () => {
    if (!select.includes(userMusicId))
      setSelect((prev) => [...prev, userMusicId]);
    else setSelect((prev) => prev.filter((el) => el !== userMusicId));
  };

  return (
    <TouchableOpacity
      style={[styles.container, select.includes(userMusicId) && styles.select]}
      onPress={selectHandler}
    >
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
