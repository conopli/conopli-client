import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
  },
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
    textAlign: 'center',
  },
  buttonBox: {
    flexDirection: 'row',
  },
});

export default styles;
