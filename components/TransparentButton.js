import { TouchableOpacity } from 'react-native';
import styles from './TransparentButton.style';
import CustomText from './CustomText';
import { theme } from '../theme';

//사용시 View 컴포넌트로 감싸고 width와 height 지정 필요 (필요시 margin 지정)
//color: 글자 색상
const TransparentButton = ({ text, buttonHandler, color, fontSize }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={buttonHandler}
    >
      <CustomText
        fontWeight={800}
        style={{
          color: theme[color],
          textAlign: 'center',
          fontSize: fontSize,
        }}
      >
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};

export default TransparentButton;
