import { TouchableOpacity } from 'react-native';
import styles from './SmallButton.style';
import CustomText from './CustomText';

const SmallButton = ({ text, isClicked, setIsClicked }) => {
  return (
    <TouchableOpacity
      onPress={setIsClicked}
      style={isClicked ? styles.lime : styles.lightGray}
    >
      <CustomText fontWeight={600} style={styles.text}>
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};

export default SmallButton;
