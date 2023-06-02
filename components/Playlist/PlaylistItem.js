import { Text, View, TouchableOpacity } from 'react-native';
import { playlistColor } from '../../theme';
import styles from './PlaylistItem.style';
import { useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';
import {
  addPlaylistProps,
  deletePlaylistProps,
  editPlaylistProps,
} from '../../util';

const PlaylistItem = ({ navigation, item }) => {
  const { color, emoji, title, playListId } = item;
  const setModal = useSetRecoilState(ModalState);

  //Longpress 시 뜨는 모달
  const editModal = editPlaylistProps(
    () => {
      setModal(editPlaylist);
    },
    () => {
      setModal(deletePlaylist);
    },
  );

  //플레이리스트 수정 모달
  const editPlaylist = addPlaylistProps(
    true,
    playListId,
    title,
    emoji,
    color.toString(),
  );

  //플레이리스트 삭제 모달
  const deletePlaylist = deletePlaylistProps(playListId);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: playlistColor[color] }]}
      onPress={() => {
        navigation.push('Detail', { playListId, title });
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
