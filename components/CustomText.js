import { StyleSheet, Text } from 'react-native';
import { memo } from 'react';

const CustomText = (props) => {
  const style = StyleSheet.create({
    fontFamily: props.fontWeight
      ? `Pretendard-${props.fontWeight}`
      : 'Pretendard-400',
  });

  const getStyle = (styleProp) => {
    if (Array.isArray(styleProp)) {
      for (const item of styleProp) {
        Object.assign(style, item);
      }
      return style;
    }
    if (styleProp) return { ...style, ...styleProp };
    else return style;
  };

  return (
    <Text {...props} style={getStyle(props.style)}>
      {props.children}
    </Text>
  );
};

export default memo(CustomText);
