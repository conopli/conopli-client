import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  dropdown: {
    alignSelf: 'flex-end',
    zIndex: 1,
  },
  picker: {
    borderRadius: 4,
    marginBottom: 12,
    paddingVertical: 8,
    minHeight: 'auto',
    justifyContent: 'center',
    borderWidth: 0,
  },
  dropdownContainer: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 8,
    position: 'relative',
  },
  input: {
    backgroundColor: theme.lightGray,
    color: theme.gray,
    flex: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 44,
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  resultList: {
    flex: 1,
    marginTop: 24,
    rowGap: 8,
  },
});

export default styles;
