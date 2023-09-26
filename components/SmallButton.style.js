import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  lime: {
    backgroundColor: theme.lime,
    borderRadius: 4,
    width: 60,
    height: 28,
    justifyContent: 'center',
  },
  lightGray: {
    backgroundColor: theme.lightGray,
    borderRadius: 4,
    width: 60,
    height: 28,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: theme.black,
    textAlign: 'center',
  },
});

export default styles;
