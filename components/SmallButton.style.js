import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  lime: {
    backgroundColor: theme.lime,
    borderRadius: 4,
    width: 62,
    height: 27,
    justifyContent: 'center',
  },
  lightGray: {
    backgroundColor: theme.lightGray,
    borderRadius: 4,
    width: 62,
    height: 27,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 700,
    color: theme.black,
    textAlign: 'center',
  },
});

export default styles;
