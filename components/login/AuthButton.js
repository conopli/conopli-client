import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styles from './AuthButton.style.js';
import Kakao from '../../assets/kakao.svg';
import Naver from '../../assets/naver.svg';
import Google from '../../assets/google.svg';

const AuthButton = ({ buttonHandler, type }) => {
  const typeHandler = (t) => {
    return t === 'kakao'
      ? '카카오 로그인'
      : t === 'google'
      ? '구글 로그인'
      : '네이버 로그인';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.btnContainer, styles[type]]}
      onPress={buttonHandler}
    >
      {type === 'kakao' ? (
        <Kakao width={20} height={20} />
      ) : type === 'google' ? (
        <Google width={20} />
      ) : (
        <Naver width={20} />
      )}
      <Text style={[styles.loginText, type === 'naver' && styles.textWhite]}>
        {typeHandler(type)}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
