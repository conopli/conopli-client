import { TouchableOpacity } from 'react-native';
import styles from './RowButton.style';
import CustomText from './CustomText';

//사용시 View 컴포넌트로 감싸고 width와 height 지정 필요 (필요시 margin 지정)
const RowButton = ({ text, buttonHandler, color }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={
        color === 'red'
          ? styles.red
          : color === 'lime'
          ? styles.lime
          : styles.lightGray
      }
      onPress={buttonHandler}
    >
      <CustomText
        fontWeight={700}
        style={color === 'red' ? styles.whiteText : styles.blackText}
      >
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};

export default RowButton;
