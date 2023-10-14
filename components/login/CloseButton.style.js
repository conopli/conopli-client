import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  mapButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: theme.black,
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
