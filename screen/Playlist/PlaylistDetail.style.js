import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  playlist: {
    flex: 1,
    paddingBottom: 16,
    rowGap: 8,
  },
  emptySongDesc: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descText: {
    fontSize: 20,
    color: theme.lightGray,
  },
});

export default styles;
