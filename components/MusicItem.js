import { TouchableOpacity, View } from 'react-native';
import styles from './MusicItem.style';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import userPlayList from '../recoil/userPlayList';
import ModalState from '../recoil/modal.js';
import { addSongProps, alertProps } from '../util';
import { memo } from 'react';
import userInfo from '../recoil/userInfo.js';
import CustomText from './CustomText';

const MusicItem = ({ item, isAdd = false }) => {
  const { num, singer, title } = item;
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
    <TouchableOpacity
      style={styles.container}
      onPress={pressHandler}
      disabled={!isAdd}
    >
      <View style={styles.songInfo}>
        <CustomText fontWeight={700} style={styles.title} numberOfLines={1}>
          {title}
        </CustomText>
        <CustomText style={styles.artist} numberOfLines={1}>
          {singer}
        </CustomText>
      </View>
      <View style={styles.num}>
        <CustomText fontWeight={900} style={styles.numText}>
          {num}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MusicItem);
