import { Text, View } from 'react-native';
import styles from './EditPlaylistModal.style.js';
import { RowButton } from '../index.js';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import userInfo from '../../recoil/userInfo';
import ModalState from '../../recoil/modal.js';
import { makeToast } from '../../util';

//설정 페이지 우측 상단 버튼 클릭 시

const EditPlaylistModal = ({ leaveHandler }) => {
  const { userId } = useRecoilValue(userInfo);
  const reset = useResetRecoilState(ModalState);

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
        {userId !== 0 && (
          <View style={styles.buttonItem}>
            <RowButton
              text="탈퇴하기"
              color="red"
              buttonHandler={() => {
                leaveHandler();
              }}
            />
          </View>
        )}
        <View style={styles.buttonItem}>
          <RowButton
            text="문의하기"
            color="lime"
            buttonHandler={() => {
              reset();
              makeToast('준비중인 기능입니다!');
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
