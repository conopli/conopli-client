import styles from './New.style.js';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { theme } from '../theme';
import { useServer } from '../util';
import { MusicItem } from '../components';
import DropDownPicker from 'react-native-dropdown-picker';
import { yearMaker, year, month, monthMaker } from '../util';

const New = () => {
  const [songList, setSongList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [curPage, setCurPage] = useState({ page: 0, totalPages: null });

  // * 드롭다운용 상태 (연도)
  const [yearOpen, setYearOpen] = useState(false);
  const [curYear, setCurYear] = useState(year);
  const [yearItems, setYearItems] = useState(yearMaker());

  // * 드롭다운용 상태 (월)
  const [monthOpen, setMonthOpen] = useState(false);
  const [curMonth, setCurMonth] = useState(month);
  const [monthItems, setMonthItems] = useState(monthMaker(curYear));

  const server = useServer();

  const getData = async () => {
    try {
      const { data } = await server.get(
        `/api/search/new-music?yy=${curYear}&mm=${curMonth}&page=${curPage.page}`,
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
    getNewList();
  }, [curYear, curMonth]);

  useEffect(() => {
    setMonthItems(monthMaker(curYear));
  }, [curYear]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={styles.pickerContainer}>
          <DropDownPicker
            theme="DARK"
            style={[styles.picker]}
            containerStyle={{ width: 'auto', flex: 1 }}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownTextStyle}
            labelStyle={styles.dropdownLabelStyle}
            arrowIconContainerStyle={{ marginLeft: 4 }}
            tickIconContainerStyle={{ marginLeft: 4 }}
            // placeholder={'플레이리스트 선택'}
            open={yearOpen}
            value={curYear}
            items={yearItems}
            setOpen={setYearOpen}
            setValue={setCurYear}
            setItems={setYearItems}
            onSelectItem={() => {
              setCurPage({ page: 0, totalPages: null });
            }}
          />
          <DropDownPicker
            theme="DARK"
            style={[styles.picker]}
            dropDownContainerStyle={styles.dropdownContainer}
            containerStyle={{ width: 'auto', flex: 1 }}
            textStyle={styles.dropdownTextStyle}
            labelStyle={styles.dropdownTextStyle}
            arrowIconContainerStyle={{ marginLeft: 4 }}
            tickIconContainerStyle={{ marginLeft: 4 }}
            // placeholder={'플레이리스트 선택'}
            open={monthOpen}
            value={curMonth}
            items={monthItems}
            setOpen={setMonthOpen}
            setValue={setCurMonth}
            setItems={setMonthItems}
            onSelectItem={() => {
              setCurPage({ page: 0, totalPages: null });
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
