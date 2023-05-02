import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  mapButton: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: theme.lime,
  },
});

export default styles;
