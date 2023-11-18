import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
    borderRadius: 16,
    height: 269,
    padding: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
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
