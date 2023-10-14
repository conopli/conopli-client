import { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './ListItem.style.js';
import ModalState from '../../recoil/modal';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { addSongProps, alertProps } from '../../util/modalProps.js';
import userPlayList from '../../recoil/userPlayList';
import userInfo from '../../recoil/userInfo.js';
import { CustomText } from '../index';

const ListItem = ({ item }) => {
  const { ranking, title, singer, num } = item;
  const setModal = useSetRecoilState(ModalState);
  const playList = useRecoilValue(userPlayList);
  const { userId } = useRecoilValue(userInfo);

  const songModal = addSongProps({ title, singer, num }, playList);
  const alertLogin = alertProps(
    '로그인 안내',
    '로그인 하시면\n해당 곡을 플레이리스트에 추가할 수 있습니다',
  );

  const pressHandler = () => {
    if (userId) {
      setModal(songModal);
    } else {
      setModal(alertLogin);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pressHandler}>
      <View style={styles.leftbox}>
        <CustomText fontWeight={900} style={styles.rate}>
          {ranking}
        </CustomText>
      </View>
      <View style={styles.musicbox}>
        <CustomText fontWeight={700} style={styles.title} numberOfLines={1}>
          {title}
        </CustomText>
        <CustomText style={styles.singer} numberOfLines={1}>
          {singer}
        </CustomText>
      </View>
      <View style={styles.numbox}>
        <CustomText fontWeight={900} style={styles.number}>
          {num}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ListItem);
