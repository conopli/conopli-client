import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
    borderRadius: 16,
    height: 224,
    padding: 40,
  },
  title: {
    fontSize: 24,

    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,

    marginBottom: 40,
  },
  buttonBox: {
    flexDirection: 'row',
  },
});

export default styles;
