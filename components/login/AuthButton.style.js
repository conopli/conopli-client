import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  google: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.black,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingVertical: 8,
  },
  kakao: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.black,
    backgroundColor: '#FEE500',
    borderRadius: 5,
    paddingVertical: 8,
  },
  naver: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.white,
    backgroundColor: '#03C75A',
    borderRadius: 5,
    paddingVertical: 8,
  },
  logo: {
    width: 20,
    height: 20,
  },
  ft_black: {
    fontSize: 20,
    fontWeight: 700,
    color: theme.black,
    marginLeft: 8,
  },
  ft_white: {
    fontSize: 20,
    fontWeight: 700,
    color: theme.white,
    marginLeft: 8,
  },
});

export default styles;
