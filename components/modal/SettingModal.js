import { Text, View } from 'react-native';
import styles from './EditPlaylistModal.style.js';
import { RowButton } from '../index.js';
import { useResetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';

//설정 페이지 우측 상단 버튼 클릭 시

const EditPlaylistModal = ({ leaveHandler }) => {
  return (
    <View
      style={styles.modalContainer}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <Text style={styles.title}>설정 더보기</Text>
      <View style={styles.buttonBox}>
        <View style={styles.buttonItem}>
          <RowButton
            text="탈퇴하기"
            color="red"
            buttonHandler={() => {
              leaveHandler();
            }}
          />
        </View>
        <View style={styles.buttonItem}>
          <RowButton
            text="문의하기"
            color="lime"
            buttonHandler={() => {
              console.log('문의하기는 준비중!');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EditPlaylistModal;
