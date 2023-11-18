import styles from './BasicToolTip.style';
import CustomText from './CustomText';
import Tooltip from 'react-native-walkthrough-tooltip';
import TooltipState from '../recoil/tooltip';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { tooltipWord } from '../static/word';
import { View } from 'react-native';

const BasicToolTip = () => {
  const { show, routeType } = useRecoilValue(TooltipState);
  const resetTooltip = useResetRecoilState(TooltipState);

  const tooltipText = (type) => {
    switch (type) {
      case 'Popluer':
        return tooltipWord.Populer;
      case 'New':
        return tooltipWord.New;
      case 'Search':
        return tooltipWord.Search;
      case 'Map':
        return tooltipWord.Map;
    }
  };

  return (
    <Tooltip
      isVisible={show}
      placement="bottom"
      backgroundColor="transtparent"
      content={
        <View>
          {tooltipText(routeType) &&
            tooltipText(routeType).map((text, index) => {
              return (
                <CustomText
                  key={`${routeType}_${index}`}
                  fontWeight={600}
                  style={styles.text}
                >
                  {text}
                </CustomText>
              );
            })}
        </View>
      }
      contentStyle={styles.wrap}
      onClose={resetTooltip}
    ></Tooltip>
  );
};

export default BasicToolTip;
