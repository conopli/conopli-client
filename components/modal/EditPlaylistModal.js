import React from 'react';
import { Modal, Text, View } from 'react-native';
import styles from './EditPlaylist.style.js';
import { RowButton } from '../index.js';

//플레이리스트 longPress시 뜨는 모달창

const EditPlaylistModal = ({ isVisible, setIsVisible, handler }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>플레이리스트 편집</Text>
          <View style={styles.buttonBox}>
            <View style={styles.buttonItem}>
              <RowButton
                text="수정"
                color="lime"
                buttonHandler={() => {
                  handler();
                }}
              />
            </View>
            <View style={styles.buttonItem}>
              <RowButton
                text="삭제"
                color="red"
                buttonHandler={() => {
                  setIsVisible((prev) => !prev);
                }}
              />
            </View>
            <View style={styles.buttonItem}>
              <RowButton
                text="취소"
                color="gray"
                buttonHandler={() => {
                  handler();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditPlaylistModal;
