import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  red: {
    flex: 1,
    backgroundColor: theme.red,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  lime: {
    flex: 1,
    backgroundColor: theme.lime,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  lightGray: {
    flex: 1,
    backgroundColor: theme.lightGray,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  blackText: {
    color: theme.black,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 700,
  },
  whiteText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 700,
  },
});

export default styles;
