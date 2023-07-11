import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './PlaylistSort.style';
import { theme } from '../../theme';
import {
  BackButton,
  ConfirmModifyButton,
  SortMusicItem,
} from '../../components/Playlist';
import { confirmProps, useServer } from '../../util';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const PlaylistSort = ({ navigation, route }) => {
  const server = useServer();
  const { playListId } = route.params;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const setModal = useSetRecoilState(ModalState);
  const reset = useResetRecoilState(ModalState);
  const confirm = confirmProps(
    '수정하시겠습니까?',
    '배치하신 순서대로 수정됩니다.',
    '확인',
    () => {
      setSortedSongList();
      reset();
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigation.goBack();
      }, 700);
    },
  );

  const getSongLists = async () => {
    try {
      const { data } = await server.get(`/api/user-music/${playListId}`);
      setItems(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setSortedSongList = async () => {
    const orderList = items.map((el) => el.orderNum);

    try {
      const { data } = await server.patch(`/api/user-music/contents`, {
        playListId,
        orderList,
      });
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
        <ConfirmModifyButton
          onPress={() => {
            setModal(confirm);
          }}
        />
      ),
    });
  });

  const DragList = gestureHandlerRootHOC(() => (
    <DraggableFlatList
      keyExtractor={(item) => item.userMusicId}
      style={styles.playlist}
      data={items}
      renderItem={(props) => <SortMusicItem {...props} />}
      containerStyle={styles.playlist}
      onDragEnd={({ data }) => setItems(data)}
      contentContainerStyle={{ rowGap: 8 }}
    />
  ));

  const Loading = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          style={{ flex: 1 }}
          size="large"
          color={theme.lime}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DragList />
      {isLoading && <Loading />}
    </View>
  );
};

export default PlaylistSort;
