import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 14,
  },
  modal_container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
    borderRadius: 16,
    height: 388,
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 39,
  },
  song_box: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    flexDirection: 'row',
    borderRadius: 4,
    marginBottom: 40,
    borderColor: theme.black,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 12.5,
  },
  button_box: {
    flexDirection: 'row',
  },
  song_title: {
    fontSize: 16,
    fontWeight: 700,
  },
  song_artist: {
    fontSize: 16,
    fontWeight: 500,
  },
  song_number: {
    fontSize: 20,
    fontWeight: 800,
  },
  selected_container: {
    height: 60,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
  },
  selected_title: {
    fontSize: 16,
    fontWeight: 700,
  },
  picker: {
    borderRadius: 4,
    marginBottom: 12,
    paddingVertical: 8,
    minHeight: 'auto',
    justifyContent: 'center',
    borderWidth: 0,
    backgroundColor: theme.lightGray,
  },
  dropdownContainer: {
    backgroundColor: theme.lightGray,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default styles;
