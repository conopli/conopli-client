import { View } from 'react-native';
import styles from './DeleteModal.style.js';
import { RowButton, CustomText } from '../index.js';
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useServer } from '../../util';
import ModalState from '../../recoil/modal.js';
import userInfo from '../../recoil/userInfo';
import userPlayList from '../../recoil/userPlayList';

//보관함 삭제 시 사용

const DeleteModal = ({ playListId }) => {
  const server = useServer();
  const reset = useResetRecoilState(ModalState);
  const setPlayList = useSetRecoilState(userPlayList);
  const { userId } = useRecoilValue(userInfo);

  const deleteHandler = async () => {
    try {
      await server.delete(`/api/user-music/playlist/${playListId}`);
      getPlaylist();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const getPlaylist = async () => {
    try {
      const { data } = await server.get(`/api/user-music/playlist/${userId}`);
      setPlayList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={styles.modalContainer}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <CustomText fontWeight={700} style={styles.title}>
        삭제하시겠습니까?
      </CustomText>
      <CustomText fontWeight={500} style={styles.subTitle}>
        삭제 후에는 되돌릴 수 없습니다.
      </CustomText>
      <View style={styles.buttonBox}>
        <View style={{ flex: 1, marginRight: 8, height: 40 }}>
          <RowButton
            text="삭제하기"
            color="red"
            buttonHandler={deleteHandler}
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
