import { Text, View, Platform } from 'react-native';
import { theme } from '../theme';

const Setting = () => {
  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <Text>설정</Text>
    </View>
  );
};

export default Setting;
