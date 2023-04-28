import { useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import styles from './PlaylistModify.style';
import {
  BackButton,
  ConfirmModifyButton,
  ModifyMusicItem,
} from '../../components/Playlist';
import { detailDummy } from '../../util';

const PlaylistModify = ({ navigation }) => {
  const [select, setSelect] = useState([]);

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

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.playlist}
        contentContainerStyle={{ rowGap: 8 }}
        data={detailDummy.data}
        renderItem={(props) => (
          <ModifyMusicItem {...props} select={select} setSelect={setSelect} />
        )}
      />
    </View>
  );
};

export default PlaylistModify;
