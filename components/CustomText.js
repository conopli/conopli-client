import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { useCallback } from 'react';

preventAutoHideAsync();

const CustomText = (props) => {
  const [fontsLoaded] = useFonts({
    Pretendard: require('../assets/fonts/PretendardJPVariable.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const style = StyleSheet.create({
    fontFamily: 'Pretendard',
  });

  const getStyle = (styleProp) => {
    // styleProp is able to overwrite style
    if (styleProp) return { ...style, ...styleProp };
    else return style;
  };

  return (
    <Text onLayout={onLayoutRootView} {...props} style={getStyle(props.style)}>
      {props.children}
    </Text>
  );
};

export default CustomText;
