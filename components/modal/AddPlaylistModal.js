import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import styles from './AddPlaylistModal.style.js';
import { RowButton, CustomText } from '../index.js';
import { playlistColor, theme } from '../../theme.js';
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';
import userInfo from '../../recoil/userInfo.js';
import userPlayList from '../../recoil/userPlayList';
import EmojiPicker from 'rn-emoji-keyboard';
import { makeToast, useServer } from '../../util';
import { useFonts } from 'expo-font';

//플레이리스트 생성 및 수정 시 사용

const AddPlaylistModal = ({
  playListId,
  isEdit,
  oldName = '',
  oldIcon = 127925,
  oldColor = '18',
}) => {
  const server = useServer();
  const reset = useResetRecoilState(ModalState);
  const setPlayList = useSetRecoilState(userPlayList);
  const { userId } = useRecoilValue(userInfo);
  const [playlistName, setPlaylistName] = useState(oldName);
  const [selected, setSelected] = useState(oldColor);
  const [emoji, setEmoji] = useState(oldIcon);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [fontsLoaded] = useFonts({
    Pretendard: require('../../assets/fonts/PretendardJPVariable.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const isValid = () => {
    if (!playlistName.length) return false;
    return true;
  };

  const getEditData = () => {
    const editData = {
      userId: userId,
    };

    if (playlistName !== oldName) {
      editData.title = playlistName;
    }
    if (selected !== oldColor) {
      editData.color = selected;
    }
    if (emoji !== oldIcon) {
      editData.emoji = emoji;
    }

    return editData;
  };

  const getPlaylist = async () => {
    try {
      const { data } = await server.get(`/api/user-music/playlist/${userId}`);
      setPlayList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async () => {
    if (isEdit) {
      //플레이리스트 수정
      try {
        const editData = getEditData();
        const { data } = await server.patch(
          `/api/user-music/playlist/${playListId}`,
          editData,
        );

        await getPlaylist();
        reset();
      } catch (error) {
        console.log(error);
      }
    } else {
      //플레이리스트 생성
      try {
        if (isValid()) {
          const { data } = await server.post(`/api/user-music/playlist`, {
            userId: userId,
            title: playlistName,
            color: selected,
            emoji: emoji,
          });
          await getPlaylist();
          reset();
        } else {
          makeToast('모든 내용이 작성되었는지 확인해주세요');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View
      style={styles.modalContainer}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <CustomText style={styles.title}>{`플레이리스트 ${
        isEdit ? '수정' : '추가'
      }`}</CustomText>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => {
            setIsEmojiOpen(true);
          }}
        >
          <CustomText style={styles.icon}>
            {String.fromCodePoint(emoji)}
          </CustomText>
          <EmojiPicker
            open={isEmojiOpen}
            onClose={() => setIsEmojiOpen(false)}
            onEmojiSelected={({ emoji }) => setEmoji(emoji.codePointAt(0))}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.nameInput}
          value={playlistName}
          onChangeText={setPlaylistName}
          placeholder="이름을 입력하세요"
          placeholderTextColor={theme.gray}
        />
      </View>
      <View style={styles.colorContainer}>
        <CustomText style={styles.colorText}>색상</CustomText>
        <View style={styles.colorSelectBox}>
          {Object.keys(playlistColor).map((color) => {
            return (
              <TouchableOpacity
                key={color}
                style={
                  selected === color
                    ? {
                        backgroundColor: playlistColor[color],
                        width: 36,
                        height: 36,
                        borderRadius: 4,
                        borderWidth: 4,
                        borderStyle: 'solid',
                        borderColor: theme.black,
                      }
                    : {
                        backgroundColor: playlistColor[color],
                        width: 36,
                        height: 36,
                        borderRadius: 4,
                      }
                }
                onPress={() => {
                  setSelected(color);
                }}
              ></TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.buttonBox}>
        <View style={styles.buttonItem}>
          <RowButton
            text={isEdit ? '수정완료' : '추가하기'}
            color="lime"
            buttonHandler={submitHandler}
          />
        </View>
        <View style={styles.buttonItem}>
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

export default AddPlaylistModal;
