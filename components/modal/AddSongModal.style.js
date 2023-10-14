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

    marginBottom: 39,
  },
  songBox: {
    height: 60,
    flex: 1,
    backgroundColor: theme.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    columnGap: 12,
    borderRadius: 4,
    marginBottom: 40,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
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
  songTitle: {
    fontSize: 16,

    paddingRight: 12,
  },
  artist: {
    fontSize: 16,
    paddingRight: 12,
  },
  num: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  numText: {
    fontSize: 20,
  },
});

export default styles;
