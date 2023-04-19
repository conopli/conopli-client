import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  picker: {
    borderRadius: 4,
    marginBottom: 12,
    paddingVertical: 8,
    minHeight: 'auto',
    width: 'auto',
    justifyContent: 'center',
  },
  search: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: theme.gray,
    flex: 1,
    borderRadius: 4,
    marginLeft: 8,
  },
  resultList: {
    flex: 1,
    marginTop: 24,
    rowGap: 8,
  },
});

export default styles;
