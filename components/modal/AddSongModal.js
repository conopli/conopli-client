import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './AddSongModal.style.js';
import { RowButton } from '../index.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import ModalState from '../../recoil/modal.js';
import userPlayList from '../../recoil/userPlayList.js';

const AddSongModal = ({ selectedSong, handler }) => {
  const reset = useResetRecoilState(ModalState);
  const playList = useRecoilValue(userPlayList);
  const { title, singer, num } = selectedSong;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('플레이리스트 선택');
  const [items, setItems] = useState(playList);

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
          <Text style={styles.songTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {singer}
          </Text>
        </View>
        <View style={styles.num}>
          <Text style={styles.numText}>{num}</Text>
        </View>
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
