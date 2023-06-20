import { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
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
      headerRight: () => {
        return songList.length === 0 ? (
          <View></View>
        ) : (
          <View style={{ flexDirection: 'row', columnGap: 16 }}>
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
        );
      },
    });
  }, [songList]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getSongLists();
    });

    navigation.setOptions({
      title: title.length > 15 ? title.slice(0, 13) + '..' : title,
    });
  }, [route]);

  return (
    <View style={styles.container}>
      {songList.length === 0 ? (
        <View style={styles.emptySongDesc}>
          <Text style={styles.descText}>플레이리스트에 곡이 없습니다</Text>
        </View>
      ) : (
        <FlatList
          style={styles.playlist}
          contentContainerStyle={{ rowGap: 8, paddingBottom: 16 }}
          data={songList}
          renderItem={({ item }) => <MusicItem item={item} />}
          keyExtractor={(item) => item.userMusicId}
        />
      )}
    </View>
  );
};

export default PlaylistDetail;
