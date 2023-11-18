import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  email: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  KAKAO: {
    backgroundColor: theme.kakao,
  },
  GOOGLE: {
    backgroundColor: theme.white,
  },
  NAVER: {
    backgroundColor: theme.naver,
  },
  emailText: {
    fontSize: 12,
    color: theme.black,
    marginRight: 8,
  },
});

export default styles;
