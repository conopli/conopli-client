import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { MusicItem } from '../../components';
import styles from './PlaylistDetail.style';
import { BackButton, ModifyButton } from '../../components/Playlist';
import { server } from '../../util';
import { useRecoilValue } from 'recoil';
import userInfo from '../../recoil/userInfo.js';

const PlaylistDetail = ({ navigation, route }) => {
  const playListId = route.params.playListId;
  const { Authorization } = useRecoilValue(userInfo);
  const [songList, setSongList] = useState([]);

  const getSongLists = async () => {
    try {
      const { data } = await server.get(`/api/user-music/${playListId}`, {
        headers: {
          Authorization,
        },
      });
      setSongList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSongLists();
  }, []);

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
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.playlist}
        contentContainerStyle={{ rowGap: 8 }}
        data={songList}
        renderItem={({ item }) => <MusicItem item={item} />}
      />
    </View>
  );
};

export default PlaylistDetail;
