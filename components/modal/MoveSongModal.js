import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './MoveSongModal.style';
import { RowButton } from '../index.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';
import userPlayList from '../../recoil/userPlayList.js';
import { useNavigation } from '@react-navigation/native';
import { confirmProps } from '../../util/modalProps.js';

const MoveSongModal = ({ selectedSongs, setMoveStack, moveStack }) => {
  const setModal = useSetRecoilState(ModalState);
  const reset = useResetRecoilState(ModalState);
  const playList = useRecoilValue(userPlayList);

  const pickerLists = playList.map((item) => {
    return { label: item.title, value: item.playListId };
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('플레이리스트 선택');
  const [items, setItems] = useState(pickerLists);

  //곡 이동이기는 하지만, 현재 플레이리스트에서 선택한 플리에 해당 곡들을 추가하는 로직임
  //근데 여기서 바로 api 요청 보내는 건 아니고, confirm 버튼 눌렀을 때 반영되므로
  //아래 api 요청은 이 모달에서 이뤄지지 않는다.
  const saveStack = () => {
    //TODO::중복 제거 필요
    if (moveStack[value]) {
      console.log('넘어옴!');
      //   moveStack.map((item) => {
      //     item[value].push(...selectedSongs);
      //     console.log(item[value]);
      //     return item[value];
      //   });
    } else {
      setMoveStack((prev) => [
        ...prev,
        {
          [value]: selectedSongs,
        },
      ]);
    }
    //TODO:: toast message - '노래가 이동 되었습니다.'
  };

  const confirmMove = confirmProps(
    '노래 이동이 완료되었습니다.',
    '플레이리스트로 이동할까요?',
    '이동',
    () => {
      navigation.navigate('ListHome', {
        screen: 'Detail',
        params: { playListId: value },
      });
      reset();
    },
  );

  return (
    <View
      style={styles.modalContainer}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <Text style={styles.title}>플레이리스트 이동</Text>
      <Text style={styles.subTitle}>아래 플레이리스트로 이동하시겠습니까?</Text>
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
              saveStack();
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
