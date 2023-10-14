import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  toggleContainer: {
    position: 'absolute',
    top: 16,
    left: 89,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 9999,
    width: 216,
    height: 34,
    borderWidth: 2,
    borderColor: theme.lightBlue,
    borderRadius: 50,
    backgroundColor: theme.lightGray,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  toggle: {
    width: 106,
    height: 30,
    borderRadius: 50,
    backgroundColor: theme.lightGray,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: theme.gray,
    textAlign: 'center',
  },
  active: {
    backgroundColor: theme.lime,
  },
  activeText: {
    color: theme.black,
  },
});

export default styles;
