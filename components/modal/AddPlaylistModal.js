import React, { useState } from 'react';
import { Modal, Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from './AddPlaylist.style.js';
import { RowButton } from '../index.js';
import { FlatList } from 'react-native-web';
import { playlistColor } from '../../theme.js';
import { theme } from '../../theme.js';

//플레이리스트 생성 및 수정 시 사용

const AddPlaylistModal = ({
  isVisible,
  setIsVisible,
  oldName,
  oldIcon,
  oldColor,
}) => {
  const [playlistName, setPlaylistName] = useState('');
  const [selected, setSelected] = useState('');

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
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
                  setIsVisible((prev) => !prev);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPlaylistModal;
