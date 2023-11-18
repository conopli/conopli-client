import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  wrap: {
    padding: 16,
    backgroundColor: theme.violet,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  text: {
    color: theme.black,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default styles;
