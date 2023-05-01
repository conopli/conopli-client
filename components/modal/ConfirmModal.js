import React from 'react';
import { Modal, Text, View } from 'react-native';
import styles from './ConfirmModal.style.js';
import RowButton from '../RowButton.js';

//곡 추가 확인 시와 보관함 수정 후 확인 시 사용 가능

const ConfirmModal = ({ title, subTitle, buttonText, isVisible, handler }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <View style={styles.buttonBox}>
            <View style={{ flex: 1, marginRight: 8, height: 40 }}>
              <RowButton text={buttonText} color="lime" />
            </View>
            <View style={{ flex: 1, height: 40 }}>
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

export default ConfirmModal;