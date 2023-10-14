import styles from './DrawerContent.styles';
import { View } from 'react-native';
import EmailBadge from './login/EmailBadge';
import userInfo from '../recoil/userInfo';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import RowButton from './RowButton';
import { confirmProps, makeToast, settingProps, useServer } from '../util';
import ModalState from '../recoil/modal';
import userPlayList from '../recoil/userPlayList';
import * as MailComposer from 'expo-mail-composer';

const DrawerContent = () => {
  const { userId, email, loginType } = useRecoilValue(userInfo);
  const resetUserInfo = useResetRecoilState(userInfo);
  const resetPlayList = useResetRecoilState(userPlayList);
  const resetModal = useResetRecoilState(ModalState);
  const setModal = useSetRecoilState(ModalState);
  const server = useServer();

  //로그아웃
  const confirm = confirmProps(
    '로그아웃',
    '로그아웃 하시겠습니까?',
    '확인',
    async () => {
      await logoutHandler();
    },
  );

  const logoutHandler = async () => {
    await AsyncStorage.clear();
    resetUserInfo();
    resetPlayList();
    resetModal();
    navigation.navigate('Populer');
    makeToast('로그아웃이 완료되었습니다.');
  };

  //회원탈퇴
  const leaveHandler = async () => {
    try {
      await server.delete(`/api/users/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmLeave = confirmProps(
    '회원 탈퇴',
    '탈퇴 하시겠습니까?',
    '확인',
    async () => {
      await leaveHandler();
      await AsyncStorage.clear();
      resetUserInfo();
      resetPlayList();
      resetModal();
      navigation.navigate('Populer');
      makeToast('회원 탈퇴가 완료되었습니다.');
    },
  );

  //문의하기
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
    <View style={styles.container}>
      <EmailBadge email={email} loginType={loginType} />
      <View style={styles.buttonBox}>
        <View style={styles.buttonItem}>
          <RowButton
            text="로그아웃"
            color="red"
            buttonHandler={() => {
              setModal(confirm);
            }}
          />
        </View>
        {userId !== 0 && (
          <View style={styles.buttonItem}>
            <RowButton
              text="탈퇴하기"
              color="lightGray"
              buttonHandler={() => {
                setModal(confirmLeave);
              }}
            />
          </View>
        )}
        <View style={styles.buttonItem}>
          <RowButton
            text="문의하기"
            color="lime"
            buttonHandler={() => {
              resetModal();
              sendEmail();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DrawerContent;
