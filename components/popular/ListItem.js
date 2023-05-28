import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './ListItem.style.js';
import ModalState from '../../recoil/modal';
import { useSetRecoilState } from 'recoil';

//TODO:: 플레이리스트 내부일 때와 내부가 아닐 때를 구분해서 사용할 수 있어야 함
//플레이리스트 내부에서 사용될 때는 클릭이 되지 않도록 해야 함...
const ListItem = ({ navigation, item }) => {
  const { ranking, title, singer, num } = item;
  const setModal = useSetRecoilState(ModalState);

  const songModal = {
    isOpen: true,
    modalType: 'addSong',
    props: {
      selectedSong: {
        title,
        singer,
        num,
      },
    },
  };

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

export default ListItem;
