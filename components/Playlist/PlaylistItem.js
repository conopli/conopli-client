import { View, TouchableOpacity } from 'react-native';
import { playlistColor } from '../../theme';
import styles from './PlaylistItem.style';
import { useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';
import {
  addPlaylistProps,
  deletePlaylistProps,
  editPlaylistProps,
} from '../../util';
import { CustomText } from '../index';

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
        <CustomText style={styles.icon}>
          {String.fromCodePoint(emoji)}
        </CustomText>
      </View>
      <View style={styles.titleContainer}>
        <CustomText style={styles.title} numberOfLines={1}>
          {title}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default PlaylistItem;
