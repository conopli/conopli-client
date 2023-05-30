import { Text, View } from 'react-native';
import { useState } from 'react';
import styles from './Setting.style';
import RowButton from '../components/RowButton';
import CheckBox from 'expo-checkbox';
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userInfo from '../recoil/userInfo';
import userPlayList from '../recoil/userPlayList';
import ModalState from '../recoil/modal';
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { WithLocalSvg } from 'react-native-svg';
import { kakao, google, naver } from '../assets';
import { confirmProps } from '../util';

const Setting = ({ navigation }) => {
  const [geo, setGeo] = useState(false);
  const resetUserInfo = useResetRecoilState(userInfo);
  const resetPlayList = useResetRecoilState(userPlayList);
  const setModal = useSetRecoilState(ModalState);
  const { email, loginType } = useRecoilValue(userInfo);

  const confirm = confirmProps(
    '로그아웃',
    '로그아웃 하시겠습니까?',
    '확인',
    logoutHandler,
  );

  const logoutHandler = async () => {
    await AsyncStorage.clear();
    resetUserInfo();
    resetPlayList();
    console.log('logout');
    navigation.navigate('Populer');
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.logo}>
          <Text style={{ fontSize: 28, color: 'white' }}>(대충 로고)</Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.descText}>
            가수님, 오늘도 흥겨운 하루 되세요!
          </Text>
        </View>
        <View style={styles.emailInfo}>
          <Text style={styles.descText}>이메일 정보</Text>
          <View style={[styles.email, styles[loginType]]}>
            <Text style={styles.emailText}>{email}</Text>
            {loginType === 'KAKAO' ? (
              <WithLocalSvg width={16} asset={kakao} />
            ) : type === 'GOOGLE' ? (
              <WithLocalSvg width={16} asset={google} />
            ) : (
              <WithLocalSvg width={16} asset={naver} />
            )}
          </View>
        </View>
        <View style={styles.geo}>
          <Text style={styles.descText}>위치 정보 수집 동의</Text>
          <CheckBox
            disabled
            style={styles.checkBox}
            value={geo}
            onChange={() => {
              setGeo((prev) => !prev);
            }}
            color={geo ? theme.lime : theme.lightGray}
          />
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
