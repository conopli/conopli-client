import { Text, View } from 'react-native';
import styles from './EditPlaylistModal.style.js';
import { RowButton, CustomText } from '../index.js';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import userInfo from '../../recoil/userInfo';
import ModalState from '../../recoil/modal.js';
import { makeToast } from '../../util';
import * as MailComposer from 'expo-mail-composer';

//설정 페이지 우측 상단 버튼 클릭 시

const EditPlaylistModal = ({ leaveHandler }) => {
  const { userId } = useRecoilValue(userInfo);
  const reset = useResetRecoilState(ModalState);

  const sendEmail = async () => {
    let options = {
      subject: '문의사항 제목을 입력해주세요',
      recipients: ['conopli.dev@gmail.com'],
      body: '문의사항 내용을 입력해주세요',
    };

    let promise = new Promise((resolve, reject) => {
      MailComposer.composeAsync(options)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });

    let statusText = (type) => {
      switch (type) {
        case 'cancelled':
          return '문의 메일이 임시저장되지 않았습니다';
        case 'saved':
          return '문의 메일이 임시저장되었습니다';
        case 'sent':
          return '문의 메일이 전송되었습니다';
        case 'undeterminded':
          return '오류가 발생했습니다';
      }
    };

    promise.then(
      (result) => {
        const message = statusText(result.status);
        makeToast(message);
      },
      (err) => {
        makeToast(`에러: ${err}의 이유로 문제가 발생했습니다`, true);
      },
    );
  };

  return (
    <View
      style={styles.modalContainer}
      onStartShouldSetResponder={(event) => true}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
    >
      <CustomText style={styles.title}>설정 더보기</CustomText>
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
              sendEmail();
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
