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
    flexDirection: 'row',
    columnGap: 4,
  },
  titleText: {
    fontSize: 16,
    paddingRight: 12,
  },
  artist: {
    fontSize: 14,
    paddingRight: 12,
  },
  nums: {},
  num: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 4,
  },
  numText: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default styles;
