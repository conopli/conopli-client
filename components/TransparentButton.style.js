import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
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
