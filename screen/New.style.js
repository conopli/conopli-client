import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  pickersContainer: {
    flexDirection: 'row',
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 4,
    paddingVertical: 16,
  },
  picker: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 0,
    minHeight: 'auto',
  },
  dropdownContainer: {
    borderWidth: 0,
    backgroundColor: theme.background,
    shadowColor: theme.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  dropdownTextStyle: {
    fontFamily: 'Pretendard-600',
    fontSize: 20,
    color: theme.white,
    textAlign: 'left',
  },
  dropdownLabelStyle: {
    fontFamily: 'Pretendard-600',
    fontSize: 20,
    color: theme.white,
  },

  buttonBox: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
  },
  abroad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 8,
  },
});

export default styles;
