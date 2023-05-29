import React from 'react';
import { Text, View } from 'react-native';
import styles from './DeleteModal.style.js';
import { RowButton } from '../index.js';
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';
import { server } from '../../util';
import userInfo from '../../recoil/userInfo.js';
import userPlayList from '../../recoil/userPlayList.js';

//보관함 삭제 시 사용

const DeleteModal = ({ playListId }) => {
  const reset = useResetRecoilState(ModalState);
  const setPlayList = useSetRecoilState(userPlayList);
  const { userId, Authorization } = useRecoilValue(userInfo);

  const deleteHandler = async () => {
    try {
      await server.delete(`/api/user-music/playlist/${playListId}`, {
        headers: {
          Authorization,
        },
      });
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
      console.log('after delete', data.data);
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
      <Text style={styles.title}>삭제하시겠습니까?</Text>
      <Text style={styles.subTitle}>삭제 후에는 되돌릴 수 없습니다.</Text>
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
