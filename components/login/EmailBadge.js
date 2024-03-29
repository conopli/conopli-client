import styles from './EmailBadge.style';
import CustomText from '../CustomText';
import { View } from 'react-native';
import Kakao from '../../assets/kakao.svg';
import Naver from '../../assets/naver.svg';
import Google from '../../assets/google.svg';

const EmailBadge = ({ email, loginType }) => {
  return (
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
  );
};

export default EmailBadge;
