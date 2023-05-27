import { View, FlatList } from 'react-native';
import styles from './Playlist.style';
import { PlaylistItem } from '../../components';
import { useEffect, useState } from 'react';
import { PlusButton } from '../../components/index';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import ModalState from '../../recoil/modal.js';
import userPlayList from '../../recoil/userPlayList';

const Playlist = ({ navigation }) => {
  const setModal = useSetRecoilState(ModalState);
  const { playlist } = useRecoilValue(userPlayList);
  const [playLists, setPlayLists] = useState(playlist);
  console.log(playLists);

  const addPlaylist = {
    isOpen: true,
    modalType: 'addPlaylist',
    props: {
      title: '플레이리스트 추가',
      isEdit: false,
      buttonText: '추가하기',
      setPlayLists: setPlayLists,
    },
  };

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
        data={playLists}
        renderItem={(props) => (
          <PlaylistItem
            {...props}
            setPlayLists={setPlayLists}
            navigation={navigation}
          />
        )}
        contentContainerStyle={{ rowGap: 8 }}
      />
    </View>
  );
};

export default Playlist;
