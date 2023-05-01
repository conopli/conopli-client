import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styles from './AuthButton.style.js';
import { WithLocalSvg } from 'react-native-svg';
import { kakao, google, naver } from '../../assets/index.js';

const AuthButton = ({ buttonHandler, type }) => {
  const typeHandler = (t) => {
    const style =
      t === 'kakao'
        ? styles.kakao
        : t === 'google'
        ? styles.google
        : styles.naver;
    const buttonText =
      t === 'kakao'
        ? '카카오 로그인'
        : t === 'google'
        ? '구글 로그인'
        : '네이버 로그인';

    return { style, buttonText };
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={typeHandler(type).style}
      onPress={buttonHandler}
    >
      {type === 'kakao' ? (
        <WithLocalSvg width={22} height={21} asset={kakao} />
      ) : type === 'google' ? (
        <WithLocalSvg width={20} height={20} asset={google} />
      ) : (
        <WithLocalSvg width={20} height={19.83} asset={naver} />
      )}
      <Text style={type === 'naver' ? styles.ft_white : styles.ft_black}>
        {typeHandler(type).buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
