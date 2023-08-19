import { View } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './Setting.style';
import RowButton from '../components/RowButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userInfo from '../recoil/userInfo';
import userPlayList from '../recoil/userPlayList';
import ModalState from '../recoil/modal';
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Kakao from '../assets/kakao.svg';
import Naver from '../assets/naver.svg';
import Google from '../assets/google.svg';
import SymbolLogo from '../assets/symbolLogo.svg';
import TypoLogo from '../assets/typoLogo.svg';
import { confirmProps, makeToast, settingProps, useServer } from '../util';
import { ThreeDotButton } from '../components/Setting';
import { CustomText } from '../components';

const Setting = ({ navigation }) => {
  const resetUserInfo = useResetRecoilState(userInfo);
  const resetPlayList = useResetRecoilState(userPlayList);
  const resetModal = useResetRecoilState(ModalState);
  const setModal = useSetRecoilState(ModalState);
  const { email, loginType, userId } = useRecoilValue(userInfo);
  const server = useServer();

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

  const setting = settingProps(() => {
    setModal(confirmLeave);
  });

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

  const leaveHandler = async () => {
    try {
      await server.delete(`/api/users/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ThreeDotButton
          buttonHandler={() => {
            setModal(setting);
          }}
        />
      ),
    });
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.logo}>
          <SymbolLogo width={96} height={97.6} />
          <TypoLogo width={160} height={26.94} />
        </View>
        <View style={styles.desc}>
          <CustomText style={styles.descText}>
            가수님, 오늘도 흥겨운 하루 되세요!
          </CustomText>
        </View>
        <View style={styles.emailInfo}>
          <CustomText style={styles.descText}>이메일 정보</CustomText>
          <View style={[styles.email, styles[loginType]]}>
            <CustomText fontWeight={600} style={styles.emailText}>
              {email}
            </CustomText>
            {loginType === 'KAKAO' ? (
              <Kakao width={16} />
            ) : loginType === 'GOOGLE' ? (
              <Google width={16} />
            ) : (
              <Naver width={16} />
            )}
          </View>
        </View>
      </View>
      <View style={styles.logout}>
        <RowButton
          text="로그아웃"
          color="red"
          buttonHandler={() => {
            setModal(confirm);
          }}
        />
      </View>
    </View>
  );
};

export default Setting;
