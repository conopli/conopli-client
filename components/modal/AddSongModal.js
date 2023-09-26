import { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './AddSongModal.style.js';
import { RowButton, CustomText } from '../index.js';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  useResetRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
} from 'recoil';
import ModalState from '../../recoil/modal.js';
import userInfo from '../../recoil/userInfo.js';
import recentInfo from '../../recoil/recentInfo.js';
import { useNavigation } from '@react-navigation/native';
import { confirmProps, useServer } from '../../util';

const AddSongModal = ({ selectedSong, playList }) => {
  const server = useServer();
  const setModal = useSetRecoilState(ModalState);
  const reset = useResetRecoilState(ModalState);
  const { userId } = useRecoilValue(userInfo);
  const [{ playListId }, setRecentInfo] = useRecoilState(recentInfo);
  const navigation = useNavigation();

  const { title, singer, num } = selectedSong;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    playList.map((item) => ({
      label: item.title,
      value: item.playListId,
    })),
  );
  const [value, setValue] = useState(null);

  // value 기본값 설정
  useEffect(() => {
    if (playListId) {
      setValue(playListId);
    } else {
      setValue(playList[0]?.playListId);
    }
  }, []);

  const postNewSong = async () => {
    try {
      const body = {
        userId: userId,
        playListId: value,
        musicNum: [num],
      };
      //곡 추가
      await server.post('/api/user-music', body);
      //중복 제거
      await server.patch(`/api/user-music/duplication/${value}`);
      reset();
      setModal(confirmMove);
      if (playListId !== value) {
        setRecentInfo({
          playListId: value,
        });
      }
    } catch (error) {
      console.log(error);
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
      <CustomText style={styles.title} fontWeight={700}>
        노래 추가
      </CustomText>
      <View style={styles.songBox}>
        <View style={styles.songInfo}>
          <CustomText
            style={styles.songTitle}
            fontWeight={600}
            numberOfLines={1}
          >
            {title}
          </CustomText>
          <CustomText style={styles.artist} numberOfLines={1}>
            {singer}
          </CustomText>
        </View>
        <View style={styles.num}>
          <CustomText fontWeight={600} style={styles.numText}>
            {num}
          </CustomText>
        </View>
      </View>
      <View style={styles.selectedContainer}>
        <CustomText fontWeight={600} style={styles.selectedTitle}>
          플레이리스트 선택
        </CustomText>
        <View style={styles.pickerContainer}>
          <DropDownPicker
            style={styles.picker}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{ fontFamily: 'Pretendard-600', fontSize: 16 }}
            labelStyle={{ fontFamily: 'Pretendard-600', fontSize: 16 }}
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
