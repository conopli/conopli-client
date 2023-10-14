import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
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
    marginBottom: 39,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    columnGap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: theme.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  nameInput: {
    backgroundColor: theme.lightGray,
    color: theme.gray,
    flex: 1,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Pretendard-600',
    height: 40,
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
