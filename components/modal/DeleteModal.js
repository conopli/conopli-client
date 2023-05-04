import React from 'react';
import { Modal, Text, View } from 'react-native';
import styles from './DeleteModal.style.js';
import { RowButton } from '../index.js';
import { useResetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';

//보관함 삭제 시 사용

const DeleteModal = ({ handler }) => {
  const reset = useResetRecoilState(ModalState);

  return (
    <View
      style={styles.modalContainer}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
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
              reset();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DeleteModal;
