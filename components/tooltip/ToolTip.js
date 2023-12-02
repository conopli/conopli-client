import styles from './ToolTip.style';
import { View } from 'react-native';
import CustomText from '../CustomText';
import { tooltipWord } from '../../static/word';

const ToolTip = ({ text }) => {
  return (
    <View style={styles.tooltip}>
      <View style={styles.content}>
        <View style={styles.triangle} />
        <CustomText fontWeight={600} style={styles.text}>
          {text}
        </CustomText>
      </View>
    </View>
  );
};

export default ToolTip;
