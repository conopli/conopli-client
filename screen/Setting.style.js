import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  logo: {
    alignItems: 'center',
    marginVertical: 128,
  },
  desc: {
    alignItems: 'center',
    marginBottom: 24,
  },
  descText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.white,
  },
  emailInfo: {
    alignItems: 'center',
    marginBottom: 48,
    rowGap: 8,
  },
  email: {
    fontSize: 12,
    color: theme.white,
  },
  geo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 12,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 0,
  },
  logout: {},
});

export default styles;
