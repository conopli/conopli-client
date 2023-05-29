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
    borderRadius: 50,
    backgroundColor: theme.lime,
    shadowColor: theme.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default styles;
