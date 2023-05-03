import React from 'react';
import { Text, View, Platform } from 'react-native';
import styles from './Login.style.js';
import { AuthButton } from '../components/Login';

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.login_text}>
        해당 기능은 로그인 후 이용 가능합니다.
      </Text>
      <View style={styles.button_box}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 40,
          }}
        >
          <AuthButton type="kakao" />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            height: 40,
          }}
        >
          <AuthButton type="google" />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
          <AuthButton type="naver" />
        </View>
      </View>
    </View>
  );
};

export default Login;
