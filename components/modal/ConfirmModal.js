import { View } from 'react-native';
import styles from './ConfirmModal.style.js';
import { RowButton, CustomText } from '../index.js';
import { useResetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';

//곡 추가 확인 시와 보관함 수정 후 확인 시 사용 가능

const ConfirmModal = ({ title, subTitle, buttonText, handler }) => {
  const reset = useResetRecoilState(ModalState);

  return (
    <View
      style={styles.modalContainer}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <CustomText fontWeight={700} style={styles.title}>
        {title}
      </CustomText>
      <CustomText fontWeight={500} style={styles.subTitle}>
        {subTitle}
      </CustomText>
      <View style={styles.buttonBox}>
        <View style={{ flex: 1, marginRight: 8, height: 40 }}>
          <RowButton
            text={buttonText}
            color="lime"
            buttonHandler={() => handler()}
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

export default ConfirmModal;
