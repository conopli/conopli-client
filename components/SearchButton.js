import { TouchableOpacity } from 'react-native';
import styles from './SearchButton.style';
import CustomText from './CustomText';

const SearchButton = ({ isClicked, setIsClicked }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setIsClicked((prev) => !prev);
      }}
      style={styles.button}
    >
      <CustomText style={styles.text}>{isClicked ? '가수' : '제목'}</CustomText>
    </TouchableOpacity>
  );
};

export default SearchButton;
