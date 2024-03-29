import { View } from 'react-native';
import styles from './EditPlaylistModal.style.js';
import { RowButton, CustomText } from '../index.js';
import { useResetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';

//플레이리스트 longPress시 뜨는 모달창

const EditPlaylistModal = ({ editHandler, deleteHandler }) => {
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
        플레이리스트 편집
      </CustomText>
      <View style={styles.buttonBox}>
        <View style={styles.buttonItem}>
          <RowButton
            text="수정"
            color="lime"
            buttonHandler={() => {
              editHandler();
            }}
          />
        </View>
        <View style={styles.buttonItem}>
          <RowButton
            text="삭제"
            color="red"
            buttonHandler={() => {
              deleteHandler();
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

export default EditPlaylistModal;
