import { Text, TouchableOpacity } from 'react-native';
import styles from './RowButton.style';

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
      <Text style={color === 'red' ? styles.whiteText : styles.blackText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default RowButton;
