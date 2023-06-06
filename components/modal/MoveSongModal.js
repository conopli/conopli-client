import { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './MoveSongModal.style';
import { RowButton } from '../index.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import ModalState from '../../recoil/modal.js';
import userPlayList from '../../recoil/userPlayList.js';

const MoveSongModal = ({
  selectedSongs,
  setMoveStack,
  moveStack,
  now,
  submitAction,
}) => {
  const reset = useResetRecoilState(ModalState);
  const playList = useRecoilValue(userPlayList);

  //현재 플레이리스트 제거한 플레이리스트 목록
  const pickerLists = () => {
    const lists = [];
    for (const item of playList) {
      if (item.playListId !== now) {
        lists.push({ label: item.title, value: item.playListId });
      }
    }

    return lists;
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('플레이리스트 선택');
  const [items, setItems] = useState(pickerLists());

  const saveStack = () => {
    //moveStack에 선택한 playListId가 존재하는지 확인
    const isAlready = Object.keys(moveStack).includes(value.toString());

    //moveStack의 형태는 {playListId: {musicId: num, musicId: num}} - 객체 내의 객체

    if (isAlready) {
      const newStack = {
        ...moveStack,
        [value]: { ...moveStack[value], ...selectedSongs },
      };
      setMoveStack(newStack);
    } else {
      setMoveStack({ ...moveStack, [value]: { ...selectedSongs } });
    }
    submitAction();
    //TODO:: toast message - '우측 상단의 완료 버튼을 클릭해야 반영됩니다'
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
              reset();
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
