import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.lime,
    borderRadius: 4,
    width: 84,
    height: 40,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: theme.black,
    textAlign: 'center',
  },
});

export default styles;
