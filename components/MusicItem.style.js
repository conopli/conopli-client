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
    rowGap: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  songInfo: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 16,
  },
  num: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  numText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default styles;
