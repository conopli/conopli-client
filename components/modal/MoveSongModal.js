import { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from './MoveSongModal.style';
import { RowButton, CustomText } from '../index.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { useResetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';
import { makeToast } from '../../util';

const MoveSongModal = ({
  selectedSongs,
  setMoveStack,
  moveStack,
  now,
  playList,
  submitAction,
}) => {
  const reset = useResetRecoilState(ModalState);

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
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  // dropdownPicker : 현재 플리 제외 + default 플레이리스트 설정
  useEffect(() => {
    const noCurrent = pickerLists();
    setItems(noCurrent);
    setValue(noCurrent[0]?.value);
  }, []);

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
    reset();
    makeToast('우측 상단의 완료 버튼을 클릭해야 반영됩니다');
  };

  return (
    <View
      style={styles.modalContainer}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <CustomText style={styles.title}>플레이리스트 이동</CustomText>
      <CustomText style={styles.subTitle}>
        아래 플레이리스트로 이동하시겠습니까?
      </CustomText>
      <View style={styles.selectedContainer}>
        <CustomText style={styles.selectedTitle}>플레이리스트 선택</CustomText>
        <View style={styles.pickerContainer}>
          <DropDownPicker
            style={styles.picker}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{ fontFamily: 'Pretendard-500', fontSize: 16 }}
            labelStyle={{ fontFamily: 'Pretendard-500', fontSize: 16 }}
            arrowIconContainerStyle={{ marginLeft: 4 }}
            tickIconContainerStyle={{ marginLeft: 4 }}
            placeholder={'플레이리스트 선택'}
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
            text="이동하기"
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
