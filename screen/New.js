import styles from './New.style.js';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { theme } from '../theme';
import { useServer } from '../util';
import { MusicItem } from '../components';

const New = ({ navigation }) => {
  const [songList, setSongList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [curPage, setCurPage] = useState({ page: 0, totalPages: null });
  const year = new Date().getFullYear();
  const m = new Date().getMonth() + 1;
  const month = m <= 9 ? '0' + m : m;
  const [date, setDate] = useState({ year, month });
  const server = useServer();

  const getData = async () => {
    try {
      const { data } = await server.get(
        `/api/search/new-music?yy=${date.year}&mm=${date.month}&page=${curPage.page}`,
      );
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const getNewList = async () => {
    // * 최초로 신곡 리스트 받아오는 함수
    try {
      setIsLoading(true);

      const { data, pageInfo } = await getData();
      setSongList(data);

      const { page, totalPages } = pageInfo;
      // * 페이지 증가 시키고 저장
      setCurPage({ page: page + 1, totalPages });

      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const addNewList = async () => {
    if (curPage.page < curPage.totalPages && !isAddLoading) {
      if (curPage.page < curPage.totalPages && !isAddLoading) {
        try {
          setIsAddLoading(true);

          const { data, pageInfo } = await getData();
          setSongList((prev) => [...prev, ...data]);

          const { page, totalPages } = pageInfo;
          // * 페이지 증가 시키고 저장
          setCurPage({ page: page + 1, totalPages });
          setIsAddLoading(false);
        } catch (e) {
          console.error(e);
        }
      } else return;
    }
  };

  useEffect(() => {
    getNewList();
  }, [date]);

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
          data={songList}
          renderItem={({ item }) => <MusicItem isAdd={true} item={item} />}
          onEndReached={addNewList}
          onEndReachedThreshold={0}
          ListFooterComponent={(props) =>
            isAddLoading && (
              <ActivityIndicator
                style={{ flex: 1 }}
                size="large"
                color={theme.lime}
                {...props}
              />
            )
          }
        />
      )}
    </View>
  );
};

export default New;
