import { memo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './ListItem.style.js';
import ModalState from '../../recoil/modal';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { addSongProps } from '../../util/modalProps.js';
import userPlayList from '../../recoil/userPlayList';

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
        <Text style={styles.rate}>{ranking}</Text>
      </View>
      <View style={styles.musicbox}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.singer} numberOfLines={1}>
          {singer}
        </Text>
      </View>
      <View style={styles.numbox}>
        <Text style={styles.number}>{num}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ListItem);
