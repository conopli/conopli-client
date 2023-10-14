import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,
    backgroundColor: theme.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    columnGap: 12,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  songInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 4,
  },
  title: {
    fontSize: 16,
    paddingRight: 12,
  },
  artist: {
    fontSize: 16,
    paddingRight: 12,
  },
  num: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  numText: {
    fontSize: 20,
  },
});

export default styles;
