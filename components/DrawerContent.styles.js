import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  topContent: {
    width: '90%',
  },
  logo: {
    marginBottom: 16.45,
    rowGap: 16.88,
  },
  greeting: {
    fontSize: 12,
    color: theme.white,
    marginBottom: 40,
    marginTop: 16,
  },
  buttonBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 20,
  },
  buttonItem: {
    height: 40,
  },
});

export default styles;
