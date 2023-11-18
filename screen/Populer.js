import SmallButton from '../components/SmallButton';
import ListItem from '../components/popular/ListItem';
import styles from './Populer.style.js';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { theme } from '../theme';
import { useServer } from '../util';
import { year, month } from '../util';

const Populer = ({ navigation }) => {
  const [nation, setNation] = useState(1);
  const [songList, setSongList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [curPage, setCurPage] = useState({ page: 0, totalPages: null });
  const server = useServer();

  const getData = async () => {
    try {
      const { data } = await server.get(
        `/api/search/popular?searchType=${nation}&yy=${year}&mm=${month}&page=${curPage.page}`,
      );
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const getPopulerList = async () => {
    // * 최초로 인기곡 리스트 받아오는 함수
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

  const addPopulerList = async () => {
    // * 페이지네이션을 위해 추가로 리스트 받아오는 함수
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
  };

  useEffect(() => {
    getPopulerList();
  }, [nation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <SmallButton
          text="한국"
          isClicked={nation === 1}
          setIsClicked={() => {
            setNation(1);
            setCurPage((prev) => ({ ...prev, page: 0 }));
          }}
        />
        <View style={styles.abroad}>
          <SmallButton
            text="영미"
            isClicked={nation === 2}
            setIsClicked={() => {
              setNation(2);
              setCurPage((prev) => ({ ...prev, page: 0 }));
            }}
          />
          <SmallButton
            text="일본"
            isClicked={nation === 3}
            setIsClicked={() => {
              setNation(3);
              setCurPage((prev) => ({ ...prev, page: 0 }));
            }}
          />
        </View>
      </View>
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
          renderItem={({ item }) => <ListItem item={item} />}
          onEndReached={addPopulerList}
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

export default Populer;
