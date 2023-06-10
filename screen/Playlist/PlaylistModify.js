import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import styles from './PlaylistModify.style';
import {
  BackButton,
  ConfirmModifyButton,
  ModifyListButton,
  ModifyMusicItem,
} from '../../components/Playlist';
import { useServer, makeToast } from '../../util';
import { useRecoilValue } from 'recoil';
import userInfo from '../../recoil/userInfo.js';
import { useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';

const PlaylistModify = ({ navigation, route }) => {
  const server = useServer();
  const setModal = useSetRecoilState(ModalState);
  const playListId = route.params.playListId;
  const { userId } = useRecoilValue(userInfo);

  //플리 내부에 있는 노래 리스트
  const [items, setItems] = useState([]);
  //삭제와 수정에 사용 : 선택한 노래들을 객체에 추가 (userMusicId(플리 내에서의 노래의 아이디) : num(고유한 노래의 number) 형태로 담김)
  const [select, setSelect] = useState([]);
  //삭제 요청 시 사용하는 리스트
  const [deleteItems, setDeleteItems] = useState([]);
  //곡 플리 이동용 스택 : {playListId:[ {musicId: num} , {musicId: num} ]}
  const [moveItems, setMoveItems] = useState({});

  const getSongLists = async () => {
    try {
      const { data } = await server.get(`/api/user-music/${playListId}`);
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
            submitHandler();
            console.log('수정 요청 완료!');
            navigation.goBack();
          }}
        />
      ),
    });
  });

  //모든 곡 선택
  const selectAllHandler = () => {
    const selectObj = {};
    for (let item of items) {
      selectObj[item.userMusicId] = item.num;
    }
    setSelect(selectObj);
  };

  //곡 이동 modal
  const moveProps = {
    isOpen: true,
    modalType: 'moveSong',
    props: {
      selectedSongs: select,
      setMoveStack: setMoveItems,
      moveStack: moveItems,
      now: playListId,
      submitAction: () => {
        //select를 이용해서 setItems에서 선택된 곡들 제거
        setItems((prev) =>
          prev.filter((el) => !Object.keys(select).includes(el.userMusicId)),
        );
        //select 빈배열로 초기화
        setSelect([]);
      },
    },
  };

  //플레이리스트 내부에서 이동 (API 요청 전 현재 modify페이지 내부에서 삭제)
  const moveItemHandler = () => {
    if (!Object.keys(select).length) {
      makeToast('선택된 노래가 없습니다');
    } else {
      //모달 내에서 select를 선택된 플리와 합쳐 stack으로 만드는 작업 > moveItems에 저장해줌
      setModal(moveProps);
    }
  };

  //플레이리스트 내부에서 삭제 (API 요청 전 현재 modify페이지 내부에서만 삭제)
  const deleteItemHandler = () => {
    if (!Object.keys(select).length) {
      makeToast('선택된 노래가 없습니다');
    } else {
      //modify 페이지 내에서 여러 번 삭제할 경우 고려해 삭제할 곡들 스택에 쌓는다
      setDeleteItems((prev) => {
        const newList = [...prev, ...Object.keys(select)];
        //modify 페이지 내에서 안 보이도록(삭제 된 것처럼) 처리
        setItems((prev) =>
          prev.filter((el) => !newList.includes(el.userMusicId)),
        );
        //select 초기화
        setSelect([]);
        return newList;
      });
    }
  };

  const submitHandler = async () => {
    const movePlayLists = Object.keys(moveItems);

    //이동 : 삭제 & 추가
    if (movePlayLists.length) {
      for (let key in moveItems) {
        //현재 플리에서 삭제
        await server.patch(`/api/user-music`, {
          playListId: playListId,
          orderList: Object.keys(moveItems[key]),
        });

        //옮길 플리에서 추가
        await server.post(`/api/user-music`, {
          userId: userId,
          playListId: Number(key),
          musicNum: Object.values(moveItems[key]),
        });

        // TODO :: 추가 후 중복 제거 API 연결 필요
      }
    }

    //삭제
    if (deleteItems.length) {
      await server.patch(`/api/user-music`, {
        playListId: playListId,
        orderList: deleteItems,
      });
    }

    //플리 곡 다시 세팅
    getSongLists();
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <ModifyListButton type="select" onPress={selectAllHandler} />
        <View style={styles.btnRight}>
          <ModifyListButton type="move" onPress={moveItemHandler} />
          <ModifyListButton
            type="delete"
            // disabled={!Object.keys(select).length}
            onPress={deleteItemHandler}
          />
        </View>
      </View>
      <FlatList
        style={styles.playlist}
        contentContainerStyle={{ rowGap: 8 }}
        data={items}
        renderItem={(props) => (
          <ModifyMusicItem {...props} select={select} setSelect={setSelect} />
        )}
        keyExtractor={(item) => item.userMusicId}
      />
    </View>
  );
};

export default PlaylistModify;
