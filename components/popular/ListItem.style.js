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
    width: 80,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rate: {
    fontSize: 32,
  },
  musicbox: {
    flex: 1,
    rowGap: 4,
  },
  title: {
    fontSize: 16,
    paddingRight: 12,
  },
  singer: {
    fontSize: 16,
    paddingRight: 12,
  },
  num: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 4,
  },
  nums: {
    paddingRight: 16,
  },
  numText: {
    fontSize: 20,
  },
});

export default styles;
