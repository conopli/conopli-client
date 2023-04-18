import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    width: 358,
    height: 60,
    flexDirection: 'row',
    backgroundColor: theme.lightBlue,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    marginBottom: 8,
    paddingVertical: 9,
    paddingLeft: 16,
    paddingRight: 31,
  },
  leftbox: {
    flexDirection: 'row',
  },
  rate: {
    fontSize: 32,
    fontWeight: '800',
    marginRight: 39,
  },
  musicbox: {
    fontSize: 16,
  },
  title: {
    fontWeight: 700,
  },
  singer: {
    fontWeight: 500,
  },
  number: {
    fontSize: 20,
    fontWeight: 800,
  },
});

export default styles;
