import styles from './New.style.js';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { theme } from '../theme';
import { useServer } from '../util';
import { MusicItem } from '../components';

const New = ({ navigation }) => {
  const [visibleList, setVisibleList] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const server = useServer();

  const getNewList = async () => {
    try {
      setIsLoading(true);

      const {
        data: { data },
      } = await server.get(`/api/search/new-music`);

      setVisibleList(data.slice(0, 20));
      setStockList(data.slice(20));

      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const addNewList = () => {
    if (stockList.length !== 0) {
      setVisibleList((prev) => [...prev, ...stockList.slice(0, 20)]);
      setStockList((prev) => prev.slice(20));
    }
  };

  useEffect(() => {
    getNewList();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          style={{ flex: 1 }}
          size="large"
          color={theme.lime}
        />
      ) : (
        <FlatList
          keyExtractor={(item) => item.num}
          style={styles.listContainer}
          contentContainerStyle={{ rowGap: 8, paddingBottom: 16 }}
          data={visibleList}
          renderItem={({ item }) => <MusicItem isAdd={true} item={item} />}
          onEndReached={addNewList}
          onEndReachedThreshold={0}
        />
      )}
    </View>
  );
};

export default New;
