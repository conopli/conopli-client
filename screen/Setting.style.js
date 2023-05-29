import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  logo: {
    alignItems: 'center',
    marginVertical: 128,
  },
  desc: {
    alignItems: 'center',
    marginBottom: 28,
  },
  descText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.white,
  },
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
  geo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 12,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 0,
  },
  logout: {
    height: 60,
  },
});

export default styles;
