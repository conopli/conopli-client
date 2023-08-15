import { TouchableOpacity, View } from 'react-native';
import styles from './MusicItem.style';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import userPlayList from '../recoil/userPlayList';
import ModalState from '../recoil/modal.js';
import { addSongProps } from '../util';
import { memo } from 'react';
import CustomText from './CustomText';

const MusicItem = ({ item, isAdd = false }) => {
  const { num, singer, title } = item;
  const setModal = useSetRecoilState(ModalState);
  const playList = useRecoilValue(userPlayList);

  const songModal = addSongProps({ title, singer, num }, playList);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setModal(songModal);
      }}
      disabled={!isAdd}
    >
      <View style={styles.songInfo}>
        <CustomText style={styles.title} numberOfLines={1}>
          {title}
        </CustomText>
        <CustomText style={styles.artist} numberOfLines={1}>
          {singer}
        </CustomText>
      </View>
      <View style={styles.num}>
        <CustomText style={styles.numText}>{num}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MusicItem);
