import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './AddPlaylistModal.style.js';
import { RowButton } from '../index.js';
import { playlistColor } from '../../theme.js';
import { theme } from '../../theme.js';
import { useResetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';

//플레이리스트 생성 및 수정 시 사용

const AddPlaylistModal = ({
  oldName = '',
  oldIcon = '',
  oldColor = '',
  handler,
}) => {
  const reset = useResetRecoilState(ModalState);
  const [playlistName, setPlaylistName] = useState(oldName);
  const [selected, setSelected] = useState(oldColor);

  return (
    <View
      style={styles.modalContainer}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <Text style={styles.title}>플레이리스트 추가</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.iconInput} readOnly={true} value="🖤" />
        <TextInput
          style={styles.nameInput}
          value={playlistName}
          onChangeText={setPlaylistName}
          placeholder="이름을 입력하세요"
          placeholderTextColor={theme.gray}
        />
      </View>
      <View style={styles.colorContainer}>
        <Text style={styles.colorText}>색상</Text>
        <View style={styles.colorSelectBox}>
          {Object.keys(playlistColor).map((color) => {
            return (
              <TouchableOpacity
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
            text="추가하기"
            color="lime"
            buttonHandler={() => {
              handler();
            }}
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
