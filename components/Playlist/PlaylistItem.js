import { Text, View, TouchableOpacity } from 'react-native';
import { playlistColor } from '../../theme';
import styles from './PlaylistItem.style';
import { useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';

const PlaylistItem = ({ setPlayLists, navigation, item }) => {
  const { color, emoji, title, playListId } = item;
  const setModal = useSetRecoilState(ModalState);

  //Longpress 시 뜨는 모달
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

  //플레이리스트 수정 모달
  const editPlaylist = {
    isOpen: true,
    modalType: 'addPlaylist',
    props: {
      title: '플레이리스트 수정',
      buttonText: '수정완료',
      isEdit: true,
      oldName: title,
      oldIcon: emoji,
      oldColor: color.toString(),
      playListId: playListId,
    },
  };

  //플레이리스트 삭제 모달
  const deletePlaylist = {
    isOpen: true,
    modalType: 'delete',
    props: {
      playListId: playListId,
      setPlayLists: setPlayLists,
    },
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: playlistColor[color] }]}
      onPress={() => {
        navigation.push('Detail', { playListId: playListId });
      }}
      onLongPress={() => {
        setModal(editModal);
      }}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{String.fromCodePoint(emoji)}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistItem;
