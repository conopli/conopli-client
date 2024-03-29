import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  buttonBox: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  abroad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 8,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 8,
    position: 'relative',
  },
  input: {
    backgroundColor: theme.lightGray,
    color: theme.gray,
    flex: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'Pretendard-500',
    paddingRight: 44,
  },
  searchIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 9,
    position: 'absolute',
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  result: {
    flex: 1,
    marginTop: 12,
    rowGap: 8,
    justifyContent: 'center',
    alignContent: 'center',
  },
  descText: {
    color: theme.lightGray,
    fontSize: 20,
    textAlign: 'center',
  },
  tooltipContainer: {
    position: 'absolute',
    top: -40,
    left: 10,
  },
  msgBox: {
    backgroundColor: theme.violet,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  msgText: {
    color: theme.black,
  },
  triangle: {
    position: 'absolute',
    right: 10,
    bottom: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: theme.violet,
  },
});

export default styles;
