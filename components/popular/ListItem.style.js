import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    backgroundColor: theme.lightBlue,
    alignItems: 'center',
    // justifyContent: 'space-between',
    borderRadius: 4,
  },
  leftbox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rate: {
    fontSize: 32,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  musicbox: {
    flex: 3,
    rowGap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    paddingRight: 12,
  },
  singer: {
    fontSize: 16,
    fontWeight: 500,
    paddingRight: 12,
  },
  numbox: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 16,
  },
  number: {
    fontSize: 20,
    fontWeight: 800,
  },
});

export default styles;
