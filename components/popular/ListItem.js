import { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './ListItem.style.js';
import ModalState from '../../recoil/modal';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { addSongProps } from '../../util/modalProps.js';
import userPlayList from '../../recoil/userPlayList';
import { CustomText } from '../index';

const ListItem = ({ item }) => {
  const { ranking, title, singer, num } = item;
  const setModal = useSetRecoilState(ModalState);
  const playList = useRecoilValue(userPlayList);

  const songModal = addSongProps({ title, singer, num }, playList);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setModal(songModal)}
    >
      <View style={styles.leftbox}>
        <CustomText style={styles.rate}>{ranking}</CustomText>
      </View>
      <View style={styles.musicbox}>
        <CustomText style={styles.title} numberOfLines={1}>
          {title}
        </CustomText>
        <CustomText style={styles.singer} numberOfLines={1}>
          {singer}
        </CustomText>
      </View>
      <View style={styles.numbox}>
        <CustomText style={styles.number}>{num}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ListItem);
