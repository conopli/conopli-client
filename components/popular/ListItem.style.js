import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    backgroundColor: theme.lightBlue,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
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
    rowGap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
  },
  singer: {
    fontSize: 16,
    fontWeight: 500,
  },
  number: {
    fontSize: 20,
    fontWeight: 800,
  },
});

export default styles;
