import { useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import styles from './PlaylistModify.style';
import {
  BackButton,
  ConfirmModifyButton,
  ModifyListButton,
  ModifyMusicItem,
} from '../../components/Playlist';
import { detailDummy } from '../../util';

const PlaylistModify = ({ navigation }) => {
  const [items, setItems] = useState(detailDummy.data);
  const [select, setSelect] = useState([]);
  const [deleteItems, setDeleteItems] = useState([]);

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

  const selectAllHandler = () => {
    setSelect(items.map((el) => el.userMusicId));
  };

  const deleteItemHandler = () => {
    setDeleteItems((prev) => {
      const newList = [...prev, ...select];
      setItems((prev) =>
        prev.filter((el) => !newList.includes(el.userMusicId)),
      );
      setSelect([]);
      return newList;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <ModifyListButton type="select" onPress={selectAllHandler} />
        <ModifyListButton type="delete" onPress={deleteItemHandler} />
      </View>
      <FlatList
        style={styles.playlist}
        contentContainerStyle={{ rowGap: 8 }}
        data={items}
        renderItem={(props) => (
          <ModifyMusicItem {...props} select={select} setSelect={setSelect} />
        )}
      />
    </View>
  );
};

export default PlaylistModify;
