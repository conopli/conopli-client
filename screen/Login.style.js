import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 60,
  },
  login_text: {
    flex: 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.white,
    fontSize: 20,
    fontWeight: 700,
  },
  button_box: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 24,
  },
});

export default styles;
