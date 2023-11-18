import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 8,
  },
  google: {
    backgroundColor: '#FFFFFF',
  },
  kakao: {
    backgroundColor: '#FEE500',
  },
  naver: {
    backgroundColor: '#03C75A',
  },
  logo: {
    width: 20,
    height: 20,
  },
  loginText: {
    fontSize: 20,
    color: theme.black,
    marginLeft: 8,
    top: -1,
  },
  textWhite: {
    color: theme.white,
  },
});

export default styles;
