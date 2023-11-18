import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  tooltip: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowRadius: 11.95,
    shadowOpacity: 0.48,
    elevation: 18,
  },
  content: {
    padding: 16,
    backgroundColor: theme.violet,
  },
  text: {
    color: theme.black,
    textAlign: 'left',
    fontSize: 14,
  },
});

export default styles;
