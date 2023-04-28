import { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { theme } from '../../theme';
import styles from './PlaylistModify.style';
import {
  BackButton,
  ConfirmModifyButton,
  ModifyMusicItem,
} from '../../components/Playlist';

const PlaylistModify = ({ navigation }) => {
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
      <ScrollView style={styles.playlist} contentContainerStyle={{ rowGap: 8 }}>
        <ModifyMusicItem />
      </ScrollView>
    </View>
  );
};

export default PlaylistModify;
