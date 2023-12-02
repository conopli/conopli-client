import TooltipState from '../../recoil/tooltip.js';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import { Modal, TouchableOpacity } from 'react-native';
import styles from './ToolTip.style.js';
import ToolTip from './ToolTip.js';

const GlobalToolTip = () => {
  const { show, text } = useRecoilValue(TooltipState);
  const reset = useResetRecoilState(TooltipState);

  if (!show) return;

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.backdrop}
        onPress={() => {
          reset();
        }}
      >
        <ToolTip text={text} />
      </TouchableOpacity>
    </Modal>
  );
};

export default GlobalToolTip;
