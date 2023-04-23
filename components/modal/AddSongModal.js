import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from './AddSongModal.style.js';
import RowButton from '../RowButton.js';
import DropDownPicker from 'react-native-dropdown-picker';

//TODO::
//song_container에 box-shadow 주기
//dropDownPicker의 dropDown 부분 버튼 뒤로 씹히는 문제 해결

const AddSongModal = ({ isVisible, selectedSong }) => {
  const { title, artist, number } = selectedSong;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('기본 플레이리스트');
  const [items, setItems] = useState([
    { label: '기본 플레이리스트', value: 'default' },
    { label: '오늘은야 퇴사각', value: 'new1' },
    { label: '눈물 뽑고픈 날', value: 'new2' },
  ]);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.backdrop}>
        <View style={styles.modal_container}>
          <Text style={styles.title}>노래 추가</Text>
          <View style={styles.song_box}>
            <View style={styles.song_info}>
              <Text style={styles.song_title}>{title}</Text>
              <Text style={styles.song_artist}>{artist}</Text>
            </View>
            <Text style={styles.song_number}>{number}</Text>
          </View>
          <View style={styles.selected_container}>
            <Text style={styles.selected_title}>플레이리스트 선택</Text>
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
          <View style={styles.button_box}>
            <View style={{ flex: 1, marginRight: 8, height: 40 }}>
              <RowButton text="추가하기" color="lime" />
            </View>
            <View style={{ flex: 1, height: 40 }}>
              <RowButton text="취소" color="gray" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddSongModal;
