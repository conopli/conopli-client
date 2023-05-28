import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import styles from './PlaylistModify.style';
import {
  BackButton,
  ConfirmModifyButton,
  ModifyListButton,
  ModifyMusicItem,
} from '../../components/Playlist';
import { server } from '../../util';
import { useRecoilValue } from 'recoil';
import userInfo from '../../recoil/userInfo.js';

//TODO:: 플레이리스트 내부 수정

const PlaylistModify = ({ navigation, route }) => {
  const { Authorization } = useRecoilValue(userInfo);
  const playListId = route.params.playListId;
  //플리 내부에 있는 노래 리스트
  const [items, setItems] = useState([]);
  //삭제를 위한 기능 : 선택한 노래들을 배열에 추가 (userMusicId string이 담김);
  const [select, setSelect] = useState([]);
  //요 상태 기준으로 반복문 돌려서 delete 요청 보내야 함,,,
  const [deleteItems, setDeleteItems] = useState([]);

  //플레이리스트 이동 같은 경우 add, delete // confirmModal으로 확인
  //플레이리스트 내부에서 수정의 경우 연필 버튼 > 플리 이동 시 바로 적용
  //플레이리스트 내부에서 삭제의 경우 삭제할 노래들 선택 > 체크버튼 눌러야 적용되고, 만약 뒤로가기 누르면 적용 x
  //두 로직 간 차이점이 있음 - 유저의 혼란 가능성 있음

  const getSongLists = async () => {
    try {
      const { data } = await server.get(`/api/user-music/${playListId}`, {
        headers: {
          Authorization,
        },
      });
      setItems(data.data);
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
            console.log('수정완료');
            navigation.push('Detail');
          }}
        />
      ),
    });
  });

  const selectAllHandler = () => {
    setSelect(items.map((el) => el.userMusicId));
  };

  const deleteItemHandler = () => {
    setDeleteItems((prev) => {
      const newList = [...prev, ...select];
      setItems((prev) =>
        prev.filter((el) => !newList.includes(el.userMusicId)),
      );
      setSelect([]);
      return newList;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <ModifyListButton type="select" onPress={selectAllHandler} />
        <ModifyListButton type="delete" onPress={deleteItemHandler} />
      </View>
      <FlatList
        style={styles.playlist}
        contentContainerStyle={{ rowGap: 8 }}
        data={items}
        renderItem={(props) => (
          <ModifyMusicItem {...props} select={select} setSelect={setSelect} />
        )}
      />
    </View>
  );
};

export default PlaylistModify;
