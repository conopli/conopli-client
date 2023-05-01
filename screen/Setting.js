import { Text, View } from 'react-native';
import { useState } from 'react';
import styles from './Setting.style';
import RowButton from '../components/RowButton';
import CheckBox from 'expo-checkbox';
import { theme } from '../theme';

const Setting = () => {
  const [geo, setGeo] = useState(false);

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
          <Text style={styles.email}>hello@world.com</Text>
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
          buttonHandler={() => console.log('logout')}
        />
      </View>
    </View>
  );
};

export default Setting;
