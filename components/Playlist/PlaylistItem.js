import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { playlistColor } from '../../theme';
import styles from './PlaylistItem.style';
import { useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';

const PlaylistItem = ({ navigation, item }) => {
  const { color, emoji, title } = item;
  const setModal = useSetRecoilState(ModalState);

  const editModal = {
    isOpen: true,
    modalType: 'editPlaylist',
    props: {
      editHandler: () => {
        setModal(editPlaylist);
      },
      deleteHandler: () => {
        setModal(deletePlaylist);
      },
    },
  };

  const editPlaylist = {
    isOpen: true,
    modalType: 'addPlaylist',
    props: {
      title: '플레이리스트 수정',
      buttonText: '수정완료',
      oldName: title,
      oldIcon: emoji,
      oldColor: color.toString(),
      handler: () => {},
    },
  };

  const deletePlaylist = {
    isOpen: true,
    modalType: 'delete',
    props: {
      handler: () => {
        console.log('delete playlist!');
      },
    },
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: playlistColor[color] }]}
      onPress={() => {
        navigation.push('Detail');
      }}
      onLongPress={() => {
        setModal(editModal);
      }}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{emoji}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistItem;
