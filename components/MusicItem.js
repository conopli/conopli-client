import { Text, TouchableOpacity, View } from 'react-native';
import styles from './MusicItem.style';
import { useSetRecoilState } from 'recoil';
import ModalState from '../recoil/modal.js';
import { addSongProps } from '../util';

const MusicItem = ({ item, isAdd = false }) => {
  const { num, singer, title } = item;
  const setModal = useSetRecoilState(ModalState);

  const songModal = addSongProps({ title, singer, num });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setModal(songModal);
      }}
      disabled={!isAdd}
    >
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
