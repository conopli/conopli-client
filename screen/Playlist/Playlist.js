import { Text, View, FlatList } from 'react-native';
import styles from './Playlist.style';
import { PlaylistItem } from '../../components';
import { playlistDummy } from '../../util';
import { useEffect } from 'react';
import { PlusButton } from '../../components/index';
import { useSetRecoilState } from 'recoil';
import ModalState from '../../recoil/modal.js';

const Playlist = ({ navigation }) => {
  const setModal = useSetRecoilState(ModalState);

  const addPlaylist = {
    isOpen: true,
    modalType: 'addPlaylist',
    props: {
      title: '플레이리스트 추가',
      buttonText: '추가하기',
      buttonHandler: () => {
        console.log('add playlist!');
      },
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
        data={playlistDummy.data}
        renderItem={(props) => (
          <PlaylistItem {...props} navigation={navigation} />
        )}
        contentContainerStyle={{ rowGap: 8 }}
      />
    </View>
  );
};

export default Playlist;
