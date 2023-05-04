import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import styles from './AddSongModal.style.js';
import { RowButton } from '../index.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { useResetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';

//props인 selectedSong 형식
// const selectedSong = {
//   title: '오르트 구름',
//   artist: '윤하',
//   number: '10040',
// };

const AddSongModal = ({ selectedSong, handler }) => {
  const reset = useResetRecoilState(ModalState);
  const { title, artist, number } = selectedSong;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('기본 플레이리스트');
  const [items, setItems] = useState([
    { label: '기본 플레이리스트', value: 'default' },
    { label: '오늘은야 퇴사각', value: 'new1' },
    { label: '눈물 뽑고픈 날', value: 'new2' },
  ]);

  return (
    <View
      style={styles.modalContainer}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <Text style={styles.title}>노래 추가</Text>
      <View style={styles.songBox}>
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{title}</Text>
          <Text style={styles.songArtist}>{artist}</Text>
        </View>
        <Text style={styles.songNumber}>{number}</Text>
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
              handler();
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

export default AddSongModal;
