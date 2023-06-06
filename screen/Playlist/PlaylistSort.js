import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import styles from './PlaylistSort.style';
import {
  BackButton,
  ConfirmModifyButton,
  SortMusicItem,
} from '../../components/Playlist';
import { confirmProps, server } from '../../util';
import { useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';
import { detailDummy } from '../../util';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const PlaylistSort = ({ navigation, route }) => {
  // TODO : route로 params 받아올 시 아래 주석 해제 및 테스트용 변수 삭제
  // const playListId = route.params.playListId;
  const playListId = 1;
  // TODO : 실제 연결 시 더미데이터 제거 후 빈 배열로 변경해야 함
  const [items, setItems] = useState(detailDummy.data);
  const setModal = useSetRecoilState(ModalState);
  const confirm = confirmProps(
    '수정하시겠습니까?',
    '배치하신 순서대로 수정됩니다.',
    '확인',
    () => {
      setSortedSongList;
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
      const { data } = await server.patch(`/api/user-music`, {
        playListId,
        orderList,
      });
      navigation.push('Detail', { playListId });
    } catch (error) {
      console.log(error);
    }
  };
  // TODO : route로 params 받아올 시 아래 주석 해제
  useEffect(() => {
    // getSongLists();
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
