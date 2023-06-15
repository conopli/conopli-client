import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { MusicItem } from '../../components';
import styles from './PlaylistDetail.style';
import {
  BackButton,
  ModifyButton,
  SortButton,
} from '../../components/Playlist';
import { useServer } from '../../util';

const PlaylistDetail = ({ navigation, route }) => {
  const server = useServer();
  const { playListId, title } = route.params;
  const [songList, setSongList] = useState([]);

  const getSongLists = async () => {
    try {
      const { data } = await server.get(`/api/user-music/${playListId}`);
      setSongList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => (
        <ModifyButton
          onPress={() => {
            navigation.push('Modify', { playListId: playListId });
          }}
        />
      ),
      title: title,
    });

    navigation.addListener('focus', () => {
      getSongLists();
    });
  }, [route]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.playlist}
        contentContainerStyle={{ rowGap: 8 }}
        data={songList}
        renderItem={({ item }) => <MusicItem item={item} />}
        keyExtractor={(item) => item.userMusicId}
      />
      <SortButton
        handler={() => {
          navigation.push('Sort', { playListId, title });
        }}
      />
    </View>
  );
};

export default PlaylistDetail;
