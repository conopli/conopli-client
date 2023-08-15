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
    fontWeight: 700,
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
    padding: 6,
    fontSize: 24,
  },
  nameInput: {
    backgroundColor: theme.lightGray,
    fontFamily: 'Pretendard',
    fontWeight: 'bold',
    color: theme.gray,
    flex: 1,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
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
