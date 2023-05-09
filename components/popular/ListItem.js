import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './ListItem.style.js';
import ModalState from '../../recoil/modal';
import { useSetRecoilState } from 'recoil';

const ListItem = ({ item }) => {
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
      handler: () => {
        //TODO:: 플레이리스트에 곡 추가하는 로직
        setModal(confirmMove);
      },
    },
  };

  const confirmMove = {
    isOpen: true,
    modalType: 'confirm',
    props: {
      title: '추가가 완료되었습니다.',
      subTitle: '플레이리스트로 이동할까요?',
      buttonText: '이동',
      handler: () => {
        //TODO:: 추가한 플레이리스트로 이동하는 로직
        console.log('go to playlist!');
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
