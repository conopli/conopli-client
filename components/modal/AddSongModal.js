import { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from './AddSongModal.style.js';
import { RowButton } from '../index.js';
import DropDownPicker from 'react-native-dropdown-picker';
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';
import userInfo from '../../recoil/userInfo.js';
import userPlayList from '../../recoil/userPlayList.js';
import { useNavigation } from '@react-navigation/native';
import { alertProps, confirmProps, useServer } from '../../util';

const AddSongModal = ({ selectedSong }) => {
  const server = useServer();
  const setModal = useSetRecoilState(ModalState);
  const reset = useResetRecoilState(ModalState);
  const playList = useRecoilValue(userPlayList);
  const { userId } = useRecoilValue(userInfo);
  const navigation = useNavigation();
  const alert = alertProps('오류', '추가할 플레이리스트를 선택하세요.');

  // TODO : 드롭다운에 사용되는 items와 value는 하드코딩 되어야만 함.
  // 해당 부분 해결 방안 고민해야됨.
  const pickerLists = playList.map((item) => {
    return { label: item.title, value: item.playListId };
  });

  const { title, singer, num } = selectedSong;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(pickerLists);
  const [value, setValue] = useState(null);

  const postNewSong = async () => {
    if (!value) {
      setModal(alert);
    } else {
      try {
        const body = {
          userId: userId,
          playListId: value,
          musicNum: [num],
        };
        const data = await server.post('/api/user-music', body);
        //TODO:: 추가 후 중복 제거 API 연결 필요
        reset();
        setModal(confirmMove);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const confirmMove = confirmProps(
    '추가가 완료되었습니다.',
    '플레이리스트로 이동할까요?',
    '이동',
    () => {
      navigation.navigate('ListHome', {
        screen: 'Detail',
        params: {
          playListId: value,
          title: playList.find((el) => el.playListId === value).title,
        },
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

export default AddSongModal;
