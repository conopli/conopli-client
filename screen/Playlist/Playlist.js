import { View, FlatList, TouchableOpacity } from 'react-native';
import styles from './Playlist.style';
import { PlaylistItem } from '../../components/playlist';
import { useEffect } from 'react';
import { PlusButton } from '../../components/index';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import ModalState from '../../recoil/modal.js';
import userPlayList from '../../recoil/userPlayList';
import { addPlaylistProps } from '../../util';

const Playlist = ({ navigation }) => {
  const setModal = useSetRecoilState(ModalState);
  const playList = useRecoilValue(userPlayList);

  const addPlaylist = addPlaylistProps(false);

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
