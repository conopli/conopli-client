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
        //TODO:: 플레이리스트에 곡 추가하는 로직
        setModal(confirmMove);
      },
    },
  };

  const confirmMove = {
    isOpen: true,
    modalType: 'confirm',
    props: {
      title: '추가가 완료되었습니다.',
      subTitle: '플레이리스트로 이동할까요?',
      buttonText: '이동',
      handler: () => {
        //TODO:: 추가한 플레이리스트로 이동하는 로직
        console.log('go to playlist!');
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
