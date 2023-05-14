import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { playlistColor } from '../../theme';
import styles from './PlaylistItem.style';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import ModalState from '../../recoil/modal.js';

const PlaylistItem = ({ navigation, item, setPlaylist }) => {
  const { color, emoji, title, playListId } = item;
  const setModal = useSetRecoilState(ModalState);

  //Longpress 시 뜨는 모달
  const editModal = {
    isOpen: true,
    modalType: 'editPlaylist',
    props: {
      setPlaylist: setPlaylist,
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
      setPlaylist: setPlaylist,
    },
  };

  //플레이리스트 삭제 모달
  const deletePlaylist = {
    isOpen: true,
    modalType: 'delete',
    props: {
      playListId: playListId,
      setPlaylist: setPlaylist,
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
