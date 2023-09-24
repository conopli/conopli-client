import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

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
    marginBottom: 8,
  },
  songInfo: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 4,
  },
  title: {
    fontSize: 16,
  },
  artist: {
    fontSize: 16,
  },
  handle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default styles;
