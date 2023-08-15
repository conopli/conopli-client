import { View, FlatList } from 'react-native';
import styles from './Playlist.style';
import { PlaylistItem } from '../../components/Playlist';
import { useEffect } from 'react';
import { PlusButton } from '../../components/index';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import ModalState from '../../recoil/modal.js';
import userPlayList from '../../recoil/userPlayList';
import { addPlaylistProps } from '../../util';
import userInfo from '../../recoil/userInfo';

const Playlist = ({ navigation }) => {
  const setModal = useSetRecoilState(ModalState);
  const playList = useRecoilValue(userPlayList);
  const { userId } = useRecoilValue(userInfo);

  const addPlaylist = addPlaylistProps(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        userInfo ? (
          <PlusButton
            buttonHandler={() => {
              setModal(addPlaylist);
            }}
          />
        ) : null,
    });
  });
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.playListId}
        data={playList}
        renderItem={(props) => (
          <PlaylistItem {...props} navigation={navigation} />
        )}
        contentContainerStyle={{ rowGap: 8 }}
      />
    </View>
  );
};

export default Playlist;
