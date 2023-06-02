import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import styles from './Search.style';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useRef } from 'react';
import { SearchButton, MusicItem } from '../components';
import { MaterialIcons } from '@expo/vector-icons';
import { useServer } from '../util';
import { theme } from '../theme.js';

const Search = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('KOR');
  const [items, setItems] = useState([
    { label: '한국', value: 'KOR' },
    { label: '영어', value: 'ENG' },
    { label: '일본', value: 'JPN' },
  ]);
  const [searchResult, setSearchResult] = useState(null);
  const [textValue, setTextValue] = useState('');
  //제목 vs 가수 필터 버튼 값
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [prevConfig, setPrevConfig] = useState(null);
  const [pageInfo, setPageInfo] = useState({});
  const server = useServer();

  const inputRef = useRef(null);
  const searchInputHander = async () => {
    const filter = isClicked ? 2 : 1;
    try {
      setIsLoading(true);
      setSearchResult([]);
      const { data } = await server.get(
        `/api/search?searchType=${filter}&searchKeyWord=${textValue}&searchNation=${value}`,
      );
      setSearchResult(data.data);
      setPageInfo(data.pageInfo);
      setPrevConfig({ filter, textValue, value });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    inputRef.current.blur();
  };

  const nextPageHandler = async () => {
    const { page, totalPages } = pageInfo;

    if (page === totalPages - 1 || this.onEndReachedCalledDuringMomentum)
      return;

    const { filter, textValue, value } = prevConfig;

    try {
      setIsAddLoading(true);
      const { data } = await server.get(
        `/api/search?searchType=${filter}&searchKeyWord=${textValue}&searchNation=${value}&page=${
          pageInfo.page + 1
        }`,
      );
      setSearchResult((prev) => [...prev, ...data.data]);
      setPageInfo(data.pageInfo);
      this.onEndReachedCalledDuringMomentum = false;
      setIsAddLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <DropDownPicker
          style={styles.picker}
          dropDownContainerStyle={styles.dropdownContainer}
          containerStyle={{ width: 80 }} // ! 드롭다운 가로 크기 고정값 필요 시, 100%일 경우 지워도 됨
          textStyle={{ fontSize: 16, fontWeight: 'bold' }}
          arrowIconContainerStyle={{ marginLeft: 4 }}
          tickIconContainerStyle={{ marginLeft: 4 }}
          placeholder={value}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <View style={styles.search}>
        <SearchButton isClicked={isClicked} setIsClicked={setIsClicked} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`${isClicked ? '가수명' : '제목'}으로 검색하세요`}
            placeholderTextColor={theme.gray}
            value={textValue}
            onChangeText={setTextValue}
            onSubmitEditing={searchInputHander}
            ref={inputRef}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <MaterialIcons
              name="search"
              size={28}
              color="black"
              onPress={searchInputHander}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.result}>
        {isLoading ? (
          <ActivityIndicator
            style={{ flex: 1 }}
            size="large"
            color={theme.lime}
          />
        ) : searchResult === null ? (
          <Text style={styles.descText}>검색어를 입력하세요</Text>
        ) : searchResult.length === 0 ? (
          <Text style={styles.descText}>검색 결과가 없습니다</Text>
        ) : (
          <FlatList
            data={searchResult}
            renderItem={({ item }) => <MusicItem isAdd={true} item={item} />}
            keyExtractor={(item) => item.num}
            contentContainerStyle={{ rowGap: 8, paddingBottom: 12 }}
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
            onEndReached={nextPageHandler}
            onEndReachedThreshold={0}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Search;
