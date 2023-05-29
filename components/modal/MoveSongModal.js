import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './AddSongModal.style.js';
import { RowButton } from '../index.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';
import userInfo from '../../recoil/userInfo.js';
import server from '../../util/axios.js';
import userPlayList from '../../recoil/userPlayList.js';
import { useNavigation } from '@react-navigation/native';

//TODO:: default playlist 관련 로직 추가 필요

const MoveSongModal = ({ selectedLists }) => {
  const setModal = useSetRecoilState(ModalState);
  const reset = useResetRecoilState(ModalState);
  const playList = useRecoilValue(userPlayList);
  const { userId, Authorization } = useRecoilValue(userInfo);
  const navigation = useNavigation();

  const pickerLists = playList.map((item) => {
    return { label: item.title, value: item.playListId };
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('플레이리스트 선택');
  const [items, setItems] = useState(pickerLists);

  const postNewSong = async () => {
    if (value === '플레이리스트 선택') {
      console.log('no playlist');
      reset();
    } else {
      try {
        const body = {
          userId: userId,
          playListId: value,
          musicNum: num,
        };
        const data = await server.post('/api/user-music', body, {
          headers: {
            Authorization,
          },
        });
        reset();
        setModal(confirmMove);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const confirmMove = {
    isOpen: true,
    modalType: 'confirm',
    props: {
      title: '추가가 완료되었습니다.',
      subTitle: '플레이리스트로 이동할까요?',
      buttonText: '이동',
      handler: () => {
        navigation.navigate('ListHome', {
          screen: 'Detail',
          params: { playListId: value },
        });
        reset();
      },
    },
  };

  return (
    <View
      style={styles.modalContainer}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <Text style={styles.title}>플레이리스트 이동</Text>
      <View style={styles.subTitle}>
        <Text style={styles.subTitleText}>
          선택된 노래들을 아래 플레이리스트로 이동하시겠습니까?
        </Text>
      </View>
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedTitle}>플레이리스트 선택</Text>
        <View style={styles.pickerContainer}>
          <DropDownPicker
            style={styles.picker}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: 16, fontWeight: 'bold' }}
            arrowIconContainerStyle={{ marginLeft: 4 }}
            tickIconContainerStyle={{ marginLeft: 4 }}
            placeholder={value}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
      </View>
      <View style={styles.buttonBox}>
        <View style={{ flex: 1, marginRight: 8, height: 40 }}>
          <RowButton
            text="추가하기"
            color="lime"
            buttonHandler={() => {
              postNewSong();
            }}
          />
        </View>
        <View style={{ flex: 1, height: 40 }}>
          <RowButton
            text="취소"
            color="gray"
            buttonHandler={() => {
              reset();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default MoveSongModal;
