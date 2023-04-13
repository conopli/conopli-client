import { Text, View, Platform } from 'react-native';
import { theme } from '../theme';

const Playlist = () => {
  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <Text>플레이리스트</Text>
    </View>
  );
};

export default Playlist;
