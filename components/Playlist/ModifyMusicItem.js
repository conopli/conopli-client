import { Text, View, TouchableOpacity } from 'react-native';
import styles from './ModifyMusicItem.style';

const ModifyMusicItem = ({ item, select, setSelect }) => {
  const { title, singer, userMusicId, num } = item;

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
      <View style={styles.numberBox}>
        <Text style={styles.number}>{num}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ModifyMusicItem;
