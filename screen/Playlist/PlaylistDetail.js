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
        <View style={{ flexDirection: 'row', columnGap: 12 }}>
          <SortButton
            onPress={() => {
              navigation.push('Sort', { playListId, title });
            }}
          />
          <ModifyButton
            onPress={() => {
              navigation.push('Modify', { playListId: playListId });
            }}
          />
        </View>
      ),
      title: title.length > 15 ? title.slice(0, 13) + '..' : title,
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
    </View>
  );
};

export default PlaylistDetail;
