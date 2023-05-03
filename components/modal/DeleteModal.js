import React from 'react';
import { Modal, Text, View } from 'react-native';
import styles from './DeleteModal.style.js';
import { RowButton } from '../index.js';

//보관함 삭제 시 사용

const DeleteModal = ({ isVisible, setIsVisible, handler }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>삭제하시겠습니까?</Text>
          <Text style={styles.subTitle}>삭제 후에는 되돌릴 수 없습니다.</Text>
          <View style={styles.buttonBox}>
            <View style={{ flex: 1, marginRight: 8, height: 40 }}>
              <RowButton
                text="삭제하기"
                color="red"
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

export default DeleteModal;
