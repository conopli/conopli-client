import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBox: {
    flex: 1,
    width: '95%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  abroad: {
    flexDirection: 'row',
    width: 156,
  },
  pop: {
    marginRight: 8,
  },
});

export default styles;
