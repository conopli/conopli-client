import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 14,
  },
  tooltip: {
    position: 'absolute',
    top: 95,
    right: 13,
  },
  content: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: theme.violet,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowRadius: 11.95,
    shadowOpacity: 0.48,
    elevation: 18,
  },
  text: {
    color: theme.black,
    textAlign: 'left',
    fontSize: 14,
  },
  triangle: {
    position: 'absolute',
    right: 10,
    top: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: theme.violet,
  },
});

export default styles;
