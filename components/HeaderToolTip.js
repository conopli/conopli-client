import styles from './HeaderToolTip.style';
import CustomText from './CustomText';
import Tooltip from 'react-native-walkthrough-tooltip';
import TooltipState from '../recoil/tooltip';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { tooltipWord } from '../static/word';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme';

const HeaderToolTip = ({ routeName }) => {
  const resetTooltip = useResetRecoilState(TooltipState);
  const [toolTip, setToolTip] = useRecoilState(TooltipState);

  return (
    <Tooltip
      isVisible={toolTip.show}
      placement="bottom"
      backgroundColor="transtparent"
      disableShadow={true}
      content={
        <View>
          {toolTip.routeType &&
            tooltipWord[toolTip.routeType].map((text, index) => {
              return (
                <CustomText
                  key={`${toolTip.routeType}_${index}`}
                  fontWeight={600}
                  style={styles.text}
                >
                  {text}
                </CustomText>
              );
            })}
        </View>
      }
      tooltipStyle={styles.tooltip}
      contentStyle={styles.content}
      displayInsets={{ right: 13 }}
      onClose={resetTooltip}
    >
      <TouchableOpacity
        style={{ marginRight: 16 }}
        onPress={() => {
          const props = {
            show: !toolTip.show,
            routeType: routeName,
          };
          setToolTip(props);
        }}
      >
        <MaterialCommunityIcons
          name="information-outline"
          size={24}
          color={theme.white}
        />
      </TouchableOpacity>
    </Tooltip>
  );
};

export default HeaderToolTip;
