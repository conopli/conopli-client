import { View, FlatList } from 'react-native';
import styles from './Playlist.style';
import { PlaylistItem } from '../../components';
import { useEffect, useState } from 'react';
import { PlusButton } from '../../components/index';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import ModalState from '../../recoil/modal.js';
import userInfo from '../../recoil/userInfo.js';
import server from '../../util/axios.js';

const Playlist = ({ navigation }) => {
  const setModal = useSetRecoilState(ModalState);
  const { userId } = useRecoilValue(userInfo);
  const [playList, setPlaylist] = useState([]);

  const getPlaylist = async () => {
    try {
      const { data } = await server.get(`/api/user-music/playlist/${userId}`);
      setPlaylist(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPlaylist = {
    isOpen: true,
    modalType: 'addPlaylist',
    props: {
      title: '플레이리스트 추가',
      isEdit: false,
      buttonText: '추가하기',
      setPlaylist: setPlaylist,
    },
  };

  useEffect(() => {
    getPlaylist();
    console.log(playList);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PlusButton
          buttonHandler={() => {
            setModal(addPlaylist);
          }}
        />
      ),
    });
  });
  return (
    <View style={styles.container}>
      <FlatList
        data={playList}
        renderItem={(props) => (
          <PlaylistItem
            {...props}
            setPlaylist={setPlaylist}
            navigation={navigation}
          />
        )}
        contentContainerStyle={{ rowGap: 8 }}
      />
    </View>
  );
};

export default Playlist;
