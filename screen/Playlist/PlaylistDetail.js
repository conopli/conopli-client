import { useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MusicItem } from '../../components';
import { theme } from '../../theme';
import styles from './PlaylistDetail.style';
import { BackButton, ModifyButton } from '../../components/Playlist';
import { detailDummy } from '../../util';

const PlaylistDetail = ({ navigation }) => {
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
        <ModifyButton
          onPress={() => {
            navigation.push('Modify');
          }}
        />
      ),
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.playlist}
        contentContainerStyle={{ rowGap: 8 }}
        data={detailDummy.data}
        renderItem={MusicItem}
      />
    </View>
  );
};

export default PlaylistDetail;
