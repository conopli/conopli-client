import { Text, View, Platform } from 'react-native';
import { theme } from '../theme';

const Map = () => {
  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <Text>지도</Text>
    </View>
  );
};

export default Map;
