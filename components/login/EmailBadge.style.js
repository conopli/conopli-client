import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  emailInfo: {
    alignItems: 'center',
    marginBottom: 48,
    rowGap: 8,
  },
  email: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  descText: {
    fontSize: 16,
    color: theme.white,
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
