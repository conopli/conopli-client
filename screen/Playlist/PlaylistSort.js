import { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './PlaylistSort.style';
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
  const setModal = useSetRecoilState(ModalState);
  const reset = useResetRecoilState(ModalState);
  const confirm = confirmProps(
    '수정하시겠습니까?',
    '배치하신 순서대로 수정됩니다.',
    '확인',
    () => {
      setSortedSongList();
      reset();
      navigation.goBack();
      // TODO for SG : api 요청보다 goBack이 빨라서 화면상에 구현이 안되는 부분 해결해야됨
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

  return (
    <View style={styles.container}>
      <DragList />
    </View>
  );
};

export default PlaylistSort;
