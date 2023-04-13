import { Text, View, Platform } from 'react-native';
import { theme } from '../theme';

const Populer = () => {
  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <Text>인기차트</Text>
    </View>
  );
};

export default Populer;
