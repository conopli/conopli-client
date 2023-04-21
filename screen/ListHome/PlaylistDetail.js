import { Text, View, ScrollView } from 'react-native';
import { MusicItem } from '../../components';
import { theme } from '../../theme';
import styles from './PlaylistDetail.style';

const PlaylistDetail = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.playlist} contentContainerStyle={{ rowGap: 8 }}>
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
      </ScrollView>
    </View>
  );
};

export default PlaylistDetail;
