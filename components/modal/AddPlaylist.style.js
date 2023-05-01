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
    height: 467,
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 39,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    columnGap: 12,
  },
  iconInput: {
    width: 40,
    height: 40,
    backgroundColor: theme.lightGray,
    borderRadius: 4,
    padding: 6,
    fontSize: 28,
  },
  nameInput: {
    backgroundColor: theme.lightGray,
    fontWeight: 'bold',
    color: theme.gray,
    flex: 1,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonBox: {
    flexDirection: 'row',
    width: '100%',
    columnGap: 8,
  },
  buttonItem: {
    flex: 1,
    height: 40,
  },
  colorContainer: {
    marginVertical: 40,
    width: '100%',
    rowGap: 16,
    alignItems: 'center',
  },
  colorText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  colorSelectBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    rowGap: 12,
    columnGap: 12,
    flexWrap: 'wrap',
  },
});

export default styles;
