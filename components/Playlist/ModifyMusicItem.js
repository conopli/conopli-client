import { Text, View, TouchableOpacity } from 'react-native';
import styles from './ModifyMusicItem.style';

const ModifyMusicItem = ({ item, select, setSelect }) => {
  const { title, singer, userMusicId, num } = item;
  const selectMusicIds = Object.keys(select);

  const selectHandler = () => {
    if (!selectMusicIds.includes(userMusicId))
      setSelect((prev) => {
        return { ...prev, [userMusicId]: num };
      });
    else {
      const selectObj = { ...select };
      delete selectObj[userMusicId];
      setSelect(selectObj);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selectMusicIds.includes(userMusicId) && styles.select,
      ]}
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
