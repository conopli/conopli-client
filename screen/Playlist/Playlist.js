import { Text, View, FlatList } from 'react-native';
import styles from './Playlist.style';
import { PlaylistItem } from '../../components';
import { playlistDummy } from '../../util';

const Playlist = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>플레이리스트 홈</Text>
      <FlatList
        data={playlistDummy.data}
        renderItem={(props) => (
          <PlaylistItem {...props} navigation={navigation} />
        )}
        contentContainerStyle={{ rowGap: 8 }}
      />
    </View>
  );
};

export default Playlist;
