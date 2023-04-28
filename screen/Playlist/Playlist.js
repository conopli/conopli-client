import { Text, View, Platform } from 'react-native';
import { theme } from '../../theme';
import styles from './Playlist.style';
import { PlaylistItem } from '../../components';
import { useEffect } from 'react';

const Playlist = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>플레이리스트 홈</Text>
      <PlaylistItem navigation={navigation} />
    </View>
  );
};

export default Playlist;
