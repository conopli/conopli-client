import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  red: {
    flex: 1,
    backgroundColor: theme.red,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  lime: {
    flex: 1,
    backgroundColor: theme.lime,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  lightGray: {
    flex: 1,
    backgroundColor: theme.lightGray,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  blackText: {
    color: theme.black,
    textAlign: 'center',
    fontSize: 20,
  },
  whiteText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default styles;
