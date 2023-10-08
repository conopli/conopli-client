import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
  },
  buttonBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
  },
  buttonItem: {
    height: 40,
    width: '100%',
  },
});

export default styles;
