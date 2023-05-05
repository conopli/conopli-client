import { Text, TouchableOpacity, View } from 'react-native';
import styles from './MusicItem.style';
import { useSetRecoilState } from 'recoil';
import ModalState from '../recoil/modal.js';

const MusicItem = ({ item }) => {
  const { num, singer, title } = item;
  const setModal = useSetRecoilState(ModalState);

  const songModal = {
    isOpen: true,
    modalType: 'addSong',
    props: {
      selectedSong: {
        title,
        singer,
        num,
      },
      handler: () => {
        console.log('addSong...!');
      },
    },
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setModal(songModal);
      }}
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
