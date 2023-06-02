import SmallButton from '../components/SmallButton';
import ListItem from '../components/Popular/ListItem';
import styles from './Populer.style.js';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { theme } from '../theme';
import { useServer } from '../util';

const Populer = ({ navigation }) => {
  const [nation, setNation] = useState(1);
  const [visibleList, setVisibleList] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const server = useServer();

  const getPopulerList = async () => {
    const year = new Date().getFullYear();
    const m = new Date().getMonth() + 1;
    const month = m <= 9 ? '0' + m : m;

    try {
      setIsLoading(true);

      const {
        data: { data },
      } = await server.get(
        `/api/search/popular?searchType=${nation}&syy=${year}&smm=${month}&eyy=${year}&emm=${month}`,
      );

      setVisibleList(data.slice(0, 20));
      setStockList(data.slice(20));

      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const addPopulerList = () => {
    if (stockList.length !== 0) {
      setVisibleList((prev) => [...prev, ...stockList.slice(0, 20)]);
      setStockList((prev) => prev.slice(20));
    }
  };

  useEffect(() => {
    getPopulerList();
  }, [nation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <SmallButton
          text="가요"
          isClicked={nation === 1}
          setIsClicked={() => {
            setNation(1);
          }}
        />
        <View style={styles.abroad}>
          <SmallButton
            text="POP"
            isClicked={nation === 2}
            setIsClicked={() => {
              setNation(2);
            }}
          />
          <SmallButton
            text="J-POP"
            isClicked={nation === 3}
            setIsClicked={() => {
              setNation(3);
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
          style={styles.listContainer}
          contentContainerStyle={{ rowGap: 8, paddingBottom: 16 }}
          data={visibleList}
          renderItem={({ item }) => <ListItem item={item} />}
          onEndReached={addPopulerList}
          onEndReachedThreshold={0.3}
        />
      )}
    </View>
  );
};

export default Populer;
