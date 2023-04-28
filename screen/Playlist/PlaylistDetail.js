import { useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MusicItem } from '../../components';
import { theme } from '../../theme';
import styles from './PlaylistDetail.style';
import { BackButton, ModifyButton } from '../../components/Playlist';

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
      <ScrollView style={styles.playlist} contentContainerStyle={{ rowGap: 8 }}>
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
        <MusicItem />
      </ScrollView>
    </View>
  );
};

export default PlaylistDetail;
