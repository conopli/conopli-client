import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
    borderRadius: 16,
    height: 388,
    padding: 40,
  },
  title: {
    fontSize: 24,

    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  buttonBox: {
    flexDirection: 'row',
    zIndex: -1,
  },
  selectedContainer: {
    height: 60,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
  },
  selectedTitle: {
    fontSize: 16,
  },
  picker: {
    borderRadius: 4,
    marginBottom: 12,
    paddingVertical: 8,
    minHeight: 'auto',
    justifyContent: 'center',
    borderWidth: 0,
    backgroundColor: theme.lightGray,
  },
  dropdownContainer: {
    backgroundColor: theme.lightGray,
    borderWidth: 0,
  },
  pickerContainer: { zIndex: 1 },
  songInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 4,
  },
});

export default styles;
